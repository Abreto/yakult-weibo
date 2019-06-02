
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

    userByName: async (_, { username }, { logger, model }) => {
      try {
        return await model.user.findOne({ username });
      } catch (e) {
        logger.warn(e);
        return null;
      }
    },

    whoami: (_, params, { auth }) => auth,
  },

  Mutation: {
    register: async (_, { form }, { logger, model }) => {
      try {
        return await model.user.create({
          username: form.username,
          password: form.password,
        });
      } catch (e) {
        logger.warn(e);
        return null;
      }
    },

    removeUser: async (_, { id }, { logger, model }) => {
      try {
        if (id === undefined) return false;
        const res = await model.user.remove({ id });
        return (res.deletedCount > 0);
      } catch (e) {
        logger.warn(e);
        return false;
      }
    },
  },
};
