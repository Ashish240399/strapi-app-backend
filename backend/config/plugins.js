module.exports = () => ({
  io: {
    enabled: true,
    config: {
      // This will listen for all supported events on the article content type
      contentTypes: ["api::article.article"],
      socket: {
        serverOptions: {
          cors: {
            origin: "https://strapi-app-frontend.vercel.app",
            methods: ["GET", "POST"],
          },
        },
      },
    },
  },
});
