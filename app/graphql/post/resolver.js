
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

    forward: async (_, { id }, {
      logger, model, auth, checkPermission,
    }) => {
      checkPermission('MEMBER');

      try {
        const originalPost = await model.post.findById(id);
        if (originalPost === null) return false;

        const res = await model.post.create({
          poster: auth.id,
          content: originalPost.content,
          originator: originalPost.originator || originalPost.poster,
        });
        return (res !== null);
      } catch (e) {
        logger.warn(e);
        return false;
      }
    },
  },
};
