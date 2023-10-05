const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// const routes = require('./routes');

const app = express();
const { NODE_ENV, port = 7000 } = process.env;

const isProduction = NODE_ENV === 'production';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(routes);

app.use((err, req, res) => {
  res.status(500).json({
    message: 'Internal server error',
    error: isProduction ? null : err,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;