const express = require('express');
const server = express();


const db = require('./data/db.js');

const userRoutes = require('./api/users')
const postRoutes = require('./api/posts')
const tagRoutes = require('./api/tags')

server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagRoutes);


const port = 3300;
server.listen(port, () => {console.log(`\n=== Web API listening on http:localhost:${port} ===\n`)});