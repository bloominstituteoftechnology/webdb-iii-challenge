const express = require('express');
const server = express.Router();

const userRoutes = require('./userRoutes');

server.use('/users', userRoutes);

module.exports = server;
