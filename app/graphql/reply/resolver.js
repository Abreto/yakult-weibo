
module.exports = {
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
      };
    },
  },
};
