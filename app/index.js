
const app = require('./app');

module.exports = {
  boot: async () => {
    // app.service.user.auth(Buffer.from('test:test').toString('base64')).then((res) => {
    //   console.log(res);
    // });
    await app.install();
    app.listen();
  },
};
