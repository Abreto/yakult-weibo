
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');

module.exports = app => new ApolloServer({
  schema,
  context: ({ req }) => ({
    req,
    app,
    model: app.model,
  }),
  formatError: (err) => {
    if (err.extensions.code === 'YW_EXPOSE') {
      return err;
    }
    app.logger.error(err);
    return new Error('Internal server error');
  },
});
