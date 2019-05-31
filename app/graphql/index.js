
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
    app.logger.error(err);
    return err;
    // if (err.extensions.code === 'YW_EXPOSE') {
    //   delete err.extensions.exception.stacktrace; //eslint-disable-line
    //   return err;
    // }
    // app.logger.error(err, { err });
    // app.logger.error(err.extensions.exception.stacktrace.join('\n'));
    // const ierr = new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR', {
    //   message: 'Internal server error',
    // });
    // return ierr;
  },
});
