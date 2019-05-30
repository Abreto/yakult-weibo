
const path = require('path');

const isDev = require('../../lib/isDev');
const isProd = require('../../lib/isProd');

const rootPath = path.join(__dirname, '..', '..');

module.exports = {
  dev: isDev,
  prod: isProd,
  rootPath: path.join(__dirname, '..', '..'),
  appPath: path.join(rootPath, 'app'),
  clientPath: path.join(rootPath, 'client'),
  clientDistPath: path.join(rootPath, 'client/build'),
  clientDistHomepage: path.join(rootPath, 'client/build/index.html'),

  port: process.env.YW_PORT || 3001,

  mongo: {
    url: process.env.YW_MONGO_URL || 'mongodb://127.0.0.1/yakult_weibo',
    options: {
      useNewUrlParser: true,
      useFindAndModify: false,
    },
  },
};
