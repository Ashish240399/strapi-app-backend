module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Echo the message back to the client
    socket.on("message", (data) => {
      console.log("Message received:", data);
      socket.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

// d6442cc8e731f0f50185649955d418c381d50935a3fe7c8948d26552e24e064328d63869bfc22f21ad431574d7713438ed43ed7cff28255e8e28b5d3c57ea195ac9409701914e107ccba1bda1af9a816be1c60f60ed30b0432fcba021cbbb2e3841f9671db9e018d959ac15283d5f5cfe4002076ec8717d7e3c2ca26b1592744
