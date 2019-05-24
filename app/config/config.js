
const path = require('path');

const isDev = require('../../lib/isDev');

module.exports = {
  dev: isDev,
  rootPath: path.join(__dirname, '..', '..'),
  appPath: path.join(this.rootPath, 'app'),
  clientPath: path.join(this.rootPath, 'client'),
  clientDistPath: path.join(this.clientPath, 'build'),

  port: process.env.YW_PORT || 3001,
};
