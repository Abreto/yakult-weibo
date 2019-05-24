
const app = require('./app');

module.exports = {
  boot: () => {
    app.listen();
  },
};
