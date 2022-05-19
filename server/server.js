const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const mongoConnectionURL = process.env.MONGO_CONNECTION_URL;

const bodyParser = require("body-parser");
const api = require("./api");

mongoose.connect(mongoConnectionURL, () => {
  console.log("Connected to Mongo");
});

// Allows post requests to be read
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", api);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
