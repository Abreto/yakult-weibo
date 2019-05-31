
const app = require('./app');

module.exports = {
  boot: () => {
    // app.service.user.auth(Buffer.from('test:test').toString('base64')).then((res) => {
    //   console.log(res);
    // });
    app.listen();
  },
};
