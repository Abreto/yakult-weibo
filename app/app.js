
const winston = require('winston');
const express = require('express');

class App {
  constructor(appConfig) {
    this.config = appConfig;
    this.initialize();
  }

  initialize() {
    this.initializeLogger();
    this.initializeExpress();
  }

  initializeLogger() {
    this.logger = new winston.Logger();
  }

  initializeExpress() {
    this.http = express();
  }
}


const config = require('./config');

module.exports = new App(config);
