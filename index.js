const express = require('express');
const db = require('./data/db.js');
const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');
const tagRoutes = require('./tags/tagRoutes');

const server = express();

server.use(express.json());
server.use('/users', userRoutes);
server.use('/posts', postRoutes);
server.use('/tags', tagRoutes);

const port = 3000;
server.listen(port, () => {console.log(`Server is listening on port ${port}`)})
