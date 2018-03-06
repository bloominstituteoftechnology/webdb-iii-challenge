const express = require('express');
const bodyParser = require('body-parser');

// const knex = require('./database/db');

// const postRouter = require('.database/posts/postRouter');
// const tagRouter = require('.database/tags/tagRouter');
// const userRouter = require('./database/users/userRouter');

const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running man' });
});

// server.use('/posts', postRouter);
// server.use('/tags', tagRouter);
// server.use('/users', userRouter);

const port = 3000;
server.listen(port, function () {
    console.log(`Server Listening on ${port}`);
});