const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(__dirname + '/'));

app.get('/*', (req, res) => {
  return res.redirect('/index.html');
});

const hostname = 'localhost';
const port = 3000;
const server = app.listen(port, hostname, () => {
  console.log(`Server listening at http:${hostname}:${port}`);
});
