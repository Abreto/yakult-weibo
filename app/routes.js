
const express = require('express');

module.exports = ({
  config, logger, http, apolloServer,
}) => {
  apolloServer.applyMiddleware({
    app: http,
    path: '/api',
  });

  if (config.prod) {
    http.use(express.static(config.clientDistPath));
    http.get('/*', (req, res) => {
      res.sendFile(config.clientDistHomepage);
    });
  }

  http.ues((err, req, res, next) => { // eslint-disable-line
    logger.error(err.stack);
    res.status(500).send('Something broke!');
  });
};
