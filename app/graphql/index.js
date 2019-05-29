
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');

module.exports = app => new ApolloServer({
  schema,
  context: ({ req }) => ({
    req,
    app,
  }),
});
