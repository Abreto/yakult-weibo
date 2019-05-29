
module.exports = {
  Query: {
    config: async (_, { key }, { model }) => JSON.stringify(await model.config.find({ key })),
  },
  Mutation: {
    config: async (_, { key, value }, { app }) => {
      app.logger.info(`Yeah, you want ${key} to be ${value}.`);
      return true;
    },
  },
};
