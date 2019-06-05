
module.exports = {
  Reply: {
    poster: async (parent, _, { model }) => model.user.findById(parent.poster),
  },
  Query: {
    replies: async (_, { to }, { app, logger, model }) => {
      try {
        // const { ObjectId } = app.mongoose.Types;
        return await model.reply.find({
          // to: ObjectId(to),
          to,
        }).sort('-createdAt');
      } catch (e) {
        logger.warn(e);
        return [];
      }
    },
  },
  Mutation: {
    reply: async (_, { to, content }, {
      logger, auth, model, checkPermission,
    }) => {
      checkPermission('MEMBER');

      try {
        const targetPost = await model.post.findById(to);

        if (targetPost === null) return false;

        const res = await model.reply.create({
          to: targetPost.id,
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
