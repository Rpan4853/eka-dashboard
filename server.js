const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const mongoConnectionURL = process.env.MONGO_CONNECTION_URL;

const bodyParser = require("body-parser");
const api = require("./api");

mongoose.connect(mongoConnectionURL, () => {
  console.log("Connected to Mongo");
});

app.use(cors());
// Allows post, put, and delete requests bodies to be read
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client/build")));
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

app.use("/api", api);

app.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
