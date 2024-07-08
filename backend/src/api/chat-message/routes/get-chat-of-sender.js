module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/chat_messages/sender",
      handler: "chat-message.getMessageBySenderId",
    },
  ],
};
