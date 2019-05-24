
const _ = require('lodash');

let config = require('./config');

const isDev = require('../../lib/isDev');

if (isDev) {
  try {
    const localConfig = require('./config.local'); // eslint-disable-line
    config = _.merge(config, localConfig);
  } catch (e) {
    // do nothing
  }
}

module.exports = config;
