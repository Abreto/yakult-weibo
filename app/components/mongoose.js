
const _ = require('lodash');
const mongoose = require('mongoose');

module.exports = (app) => {
  _.set(app, 'mongoose', mongoose);

  app.mongoose.connect(app.config.mongo.url, app.config.mongo.options);

  app.mongoose.connection.on('error', app.logger.error.bind(app.logger, 'MongoDB connection error:'));
};
