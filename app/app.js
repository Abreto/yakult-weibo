
const winston = require('winston');

class App {
  constructor(appConfig) {
    this.config = appConfig;
    this.initialize();
  }

  initialize() {
    this.initializeLogger();
  }

  initializeLogger() {
    this.logger = new winston.Logger();
  }
}


const config = require('./config');

module.exports = new App(config);
