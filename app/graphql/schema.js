
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

const basePath = path.join(__dirname);
const types = fs.readdirSync(basePath);

const schemas = [];
const resolverMap = {};

types.forEach((type) => {
  const schemaFile = path.join(basePath, type, 'schema.graphql');
  if (fs.existsSync(schemaFile)) {
    const schema = fs.readFileSync(schemaFile, { encoding: 'utf8' });
    schemas.push(schema);
  }

  const resolverFile = path.join(basePath, type, 'resolver.js');
  if (fs.existsSync(resolverFile)) {
    const resolver = require(resolverFile); // eslint-disable-line
    _.merge(resolverMap, resolver);
  }
});

module.exports = makeExecutableSchema({
  typeDefs: schemas,
  resolvers: resolverMap,
});
