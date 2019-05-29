
const hookMongoose = require('./mongoose');
const hookModels = require('./models');

module.exports = (app) => {
  hookMongoose(app);
  hookModels(app);
};
