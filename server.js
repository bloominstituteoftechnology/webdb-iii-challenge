const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const knex = require('./database/db');

const postRouter = require('./database/posts/postRouter.js');
const tagRouter = require('./database/tags/tagRouter');
const userRouter = require('./database/users/userRouter');
const tags_postsRouter = require('./database/tags_posts/tags_postsRouter');

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running man' });
});

server.use('/posts', postRouter);
server.use('/tags', tagRouter);
server.use('/users', userRouter);
server.use('/tags_posts', tags_postsRouter);

const port = 5000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
