const express = require('express');
const server = express.Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const tagRoutes = require('./tagRoutes');

server.use('/users', userRoutes);
server.use('/posts', postRoutes);
server.use('/tags', tagRoutes);

module.exports = server;
