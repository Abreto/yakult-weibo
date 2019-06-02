
module.exports = {
  Query: {
    user: async (_, { id }, { logger, model, auth }) => {
      if (id === undefined) return auth;

      try {
        return await model.user.findById(id);
      } catch (e) {
        logger.warn(`Unsuccessful attempt: ${id}`);
        return null;
      }
    },

    whoami: (_, params, { auth }) => auth,
  },
};
