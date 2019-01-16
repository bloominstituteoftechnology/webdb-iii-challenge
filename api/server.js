const express = require("express");
const server = express();
const configureMiddleware = require("../config/middlewareConfig");

configureMiddleware(server);

server.get("/", (req, res) => {
  res.send("Sanity check: It's up!");
});

module.exports = server;
