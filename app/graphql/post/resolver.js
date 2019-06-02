
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

    posts: async (_, { onlyFollowed }, { logger, model, auth }) => {
      if (onlyFollowed === undefined) onlyFollowed = false; // eslint-disable-line
      if (auth === null) onlyFollowed = false; // eslint-disable-line

      try {
        let query = model.post.find({});
        if (onlyFollowed) {
          query = query.where({
            poster: {
              $in: auth.following,
            },
          });
        }
        return await query;
      } catch (e) {
        logger.warn(e);
        return [];
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
