const express = require("express");
const route = express.Router();
const dbConfig = require("../data/dbConfig");

route.get("/", (req, res) => {
  res.send("Students route works");
});

module.exports = route;
