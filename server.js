
const winston = require('winston');
const chokidar = require('chokidar');
const isDev = require('./lib/isDev');

if (isDev) {
  const watcher = chokidar.watch('./app');
  watcher.on('ready', () => {
    watcher.on('all', () => {
      winston.info('Clearing /app/ module cache from server');
      Object.keys(require.cache).forEach((id) => {
        if (/[/\\]app[/\\]/.test(id)) delete require.cache[id];
      });
    });
  });
}

const app = require('./app');

app.boot();
