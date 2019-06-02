
module.exports = {
  Post: {
    poster: async (parent, _, { model }) => model.user.findById(parent.poster),
    originator: async (parent, _, { model }) => model.user.findById(parent.originator),
  },
  Query: {
    post: async (_, { id }, { logger, model }) => {
      try {
        return await model.post.findById(id);
      } catch (e) {
        logger.warn(e);
        return null;
      }
    },
  },
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
