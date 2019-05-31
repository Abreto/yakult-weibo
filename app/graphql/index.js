
const { ApolloServer, ApolloError } = require('apollo-server-express');
const schema = require('./schema');

module.exports = app => new ApolloServer({
  schema,
  context: async ({ req }) => ({
    req,
    app,
    model: app.model,
    auth: await app.service.user.auth(req.headers.authorization),
  }),
  formatError: (err) => {
    app.logger.error(err);
    app.logger.error(err.extensions.exception.stacktrace.join('\n'));
    delete err.extensions.exception.stacktrace; // eslint-disable-line
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
