const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config');

const usersRouter = require('./users/usersRouter');
const postsRouter = require('./posts/postsRouter');
const tagsRouter = require('./tags/tagsRouter');

const server = express();

server.use(bodyParser.json());
server.use('/users', usersRouter);
server.use('/posts', postsRouter);
server.use('/tags', tagsRouter);

server.get('/', (req, res) => {
  res.json({ api: 'running...' });
});

server.listen(process.env.PORT || port, _ => {
  console.log(`API running on ${port}`);
});
