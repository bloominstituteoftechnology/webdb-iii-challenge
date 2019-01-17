const express = require('express');

// server from express
const server = express();

server.listen(6000, () => console.log('server up on 6000'));

exports.module = server;