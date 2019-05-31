
module.exports = {
  Query: {
    config: async (_, { key }, { model }) => {
      const res = await model.config.findOne({ key });
      if (res === null) return null;
      return res.value;
    },
  },
  Mutation: {
    config: async (_, { key, value }, { model, checkPermission }) => {
      checkPermission('ADMIN');

      const result = await model.config.updateOne({ key }, { value }, {
        upsert: true,
      });
      return (result.ok === 1);
    },
  },
};
