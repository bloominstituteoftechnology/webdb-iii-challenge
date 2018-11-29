const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.json({ api: 'Welcome to the Lambda student database!' })
})

module.exports = server;