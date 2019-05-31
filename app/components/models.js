
const _ = require('lodash');

module.exports = (app) => {
  _.set(app, 'model', {
    config: require('../model/config')(app),  // eslint-disable-line
    user: require('../model/user')(app),      // eslint-disable-line
  });
};
