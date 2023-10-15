import "dotenv/config";
const express = require('express');
import cors from "cors";
import setPort from "./src/utils/manageEnv";
const bodyParser = require('body-parser');

const routes = require('./src/routes/index');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message:"Welcome to the school library"
  })
});

const environment = app.get("env");
const PORT = setPort(environment)
app.use("/api/v1", routes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;