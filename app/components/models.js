
const _ = require('lodash');

module.exports = (app) => {
  _.set(app, 'model', {
    config: require('../model/config')(app),  // eslint-disable-line
    user: require('../model/user')(app),      // eslint-disable-line
    post: require('../model/post')(app),      // eslint-disable-line
    reply: require('../model/reply')(app),    // eslint-disable-line
  });
};
