
const hookMongoose = require('./mongoose');
const hookModels = require('./models');
const hookServices = require('./services');

module.exports = (app) => {
  hookMongoose(app);
  hookModels(app);
  hookServices(app);
};
