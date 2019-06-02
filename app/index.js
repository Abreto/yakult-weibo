
const app = require('./app');

module.exports = {
  boot: async () => {
    await app.install();
    app.listen();
  },
};
