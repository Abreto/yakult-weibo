const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.get('/api', (req, res) => res.send('API Route.'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

module.exports = {
  boot: () => {
    app.listen(port, () => console.log(`Test on port ${port}`));
  },
};
