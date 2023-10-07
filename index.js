const express = require('express');
const bodyParser = require('body-parser');
// const helmet = require('helmet');

const authRoutes = require('./src/routes/auth');

const app = express();
const { NODE_ENV, port = 7000 } = process.env;

const isProduction = NODE_ENV === 'production';

// app.use(helmet());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use((err, req, res) => {
//   res.status(500).json({
//     message: 'Internal server error',
//     error: isProduction ? null : err,
//   });
// });

app.use("/api/v1/auth", authRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;