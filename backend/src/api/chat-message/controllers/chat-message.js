"use strict";

/**
 * chat-message controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::chat-message.chat-message",
  ({ strapi }) => ({
    async getMessageBySenderId(ctx) {
      try {
        // Extract senderId from query parameters or request body
        const senderId = ctx.request.query.senderId;

        // Check if senderId is provided
        if (!senderId) {
          ctx.throw(400, "senderId is required");
        }

        // Query messages by senderId
        const messages = await strapi.db
          .query("api::chat-message.chat-message")
          .findMany({
            where: {
              $or: [{ sender: senderId }, { receiver: senderId }],
            },
            orderBy: { createdAt: "asc" },
          });

        // Return the messages
        return messages;
      } catch (err) {
        // Handle errors
        ctx.throw(500, "Internal server error", { error: err });
      }
    },
  })
);
