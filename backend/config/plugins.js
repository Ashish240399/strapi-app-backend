module.exports = () => ({
  io: {
    enabled: true,
    config: {
      // This will listen for all supported events on the article content type
      contentTypes: ["api::article.article"],
      socket: {
        serverOptions: {
          cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
        },
      },
    },
  },
});
