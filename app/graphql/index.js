
const {
  ApolloServer,
  AuthenticationError,
  // ApolloError
} = require('apollo-server-express');
const schema = require('./schema');

module.exports = app => new ApolloServer({
  schema,
  context: async ({ req }) => {
    const ctx = {
      req,
      app,
      logger: app.logger,
      model: app.model,
      service: app.service,
      auth: await app.service.user.auth(req.headers.authorization),
    };

    ctx.checkPermission = (role) => {
      const judge = app.service.user.check(ctx.auth, role);
      if (!judge) throw new AuthenticationError('Permission Denied.');
    };

    return ctx;
  },
  formatError: (err) => {
    app.logger.error(err, { err });
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
