
module.exports = {
  Mutation: {
    post: async (_, { content }, {
      logger, model, auth, checkPermission,
    }) => {
      checkPermission('MEMBER');

      try {
        const res = await model.post.create({
          poster: auth.id,
          content,
        });
        return (res !== null);
      } catch (e) {
        logger.warn(e);
        return false;
      }
    },
  },
};
