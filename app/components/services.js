
const _ = require('lodash');

module.exports = (app) => {
  _.set(app, 'service', {
    user: require('../service/user')(app), // eslint-disable-line
  });
};
