
const winston = require('winston');
const express = require('express');

const hookComponents = require('./components');
const graphql = require('./graphql');

class App {
  constructor(appConfig) {
    this.config = appConfig;
    this.initialize();
    this.loadComponents();
  }

  initialize() {
    this.initializeLogger();
    this.initializeExpress();
  }

  initializeLogger() {
    const { format, createLogger, transports } = winston;
    this.logger = createLogger({
      format: format.combine(
        format.label({ label: '[yakult-weibo-server]' }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(info => `${info.label} [${info.timestamp}] [${info.level}]: ${info.message}`),
      ),
      transports: [
        new transports.Console(),
        // new winston.transports.File({ filename: 'combined.log' })
      ],
    });
  }

  initializeExpress() {
    this.http = express();

    const app = this.http;

    // app.get('/api', (req, res) => res.send('API Route.'));

    if (this.config.prod) {
      app.use(express.static(this.config.clientDistPath));
      app.get('/*', (req, res) => {
        res.sendFile(this.config.clientDistHomepage);
      });
    }
  }

  loadComponents() {
    hookComponents(this);
    this.loadGraphql();
  }

  loadGraphql() {
    graphql(this);
  }

  listen() {
    this.http.listen(this.config.port, () => {
      this.logger.info(`🚀 Server listen on ${this.config.port}`);
    });
  }
}


const config = require('./config');

module.exports = new App(config);
