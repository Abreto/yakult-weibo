
const { ApolloServer, ApolloError } = require('apollo-server-express');
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
      delete err.extensions.exception.stacktrace; //eslint-disable-line
      return err;
    }
    app.logger.error(err);
    const ierr = new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR', {
      message: 'Internal server error',
    });
    return ierr;
  },
});
