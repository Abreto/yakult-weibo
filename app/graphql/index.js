
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    hello: String
    books: [Book]
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const resolvers = {
  Query: {
    hello: () => 'Hello',
    books: () => books,
  },
};

module.exports = app => new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    app,
  }),
});
