"use strict";

const axios = require("axios");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    const { Server } = require("socket.io");

    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("message", async (data) => {
        console.log("Message received:", data);

        // Save the original message to the database
        try {
          const response = await axios.post(
            "http://localhost:1337/api/chat-messages",
            {
              data: {
                message: data.message,
                sender: data.senderId,
                receiver: 0,
                isFromServer: false,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${data.jwt}`,
              },
            }
          );
          console.log("Original message saved to database:", response.data);
        } catch (error) {
          console.error("Error saving original message to database:", error);
        }

        // Prepare the server-echoed message
        const serverMessageData = {
          message: data.message,
          senderId: 0,
          jwt: data.jwt,
        };

        // Save the server-echoed message to the database
        try {
          const response = await axios.post(
            "http://localhost:1337/api/chat-messages",
            {
              data: {
                message: data.message,
                sender: 0,
                receiver: data.senderId,
                isFromServer: true,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${data.jwt}`,
              },
            }
          );
          console.log(
            "Server-echoed message saved to database:",
            response.data
          );
        } catch (error) {
          console.error(
            "Error saving server-echoed message to database:",
            error
          );
        }

        // Echo the message back to the client
        socket.emit("server-message", serverMessageData);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    // Attach io instance to strapi so it can be accessed in other parts of the application if needed
    strapi.io = io;
  },
};
