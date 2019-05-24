
const chokidar = require('chokidar');
const isDev = require('./lib/isDev');

if (isDev) {
  const watcher = chokidar.watch('./app');
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Clearing /app/ module cache from server'); // eslint-disable-line
      Object.keys(require.cache).forEach((id) => {
        if (/[/\\]app[/\\]/.test(id)) delete require.cache[id];
      });
    });
  });
}

const app = require('./app');

app.boot();
