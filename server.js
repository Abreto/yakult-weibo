const express = require('express');

const app = express();
const port = 3000;

app.get('/api', (req, res) => res.send('API.'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => console.log(`Test on port ${port}`));
