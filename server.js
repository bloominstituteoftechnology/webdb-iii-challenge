const express = require('express');

// server from express
const server = express();

// json middleware
server.use(express.json());

server.listen(6000, () => console.log('server up on 6000'));

module.exports = server;