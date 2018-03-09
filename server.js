const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config');
const cors = require('cors');

const usersRouter = require('./users/usersRouter');
const postsRouter = require('./posts/postsRouter');
const tagsRouter = require('./tags/tagsRouter');
const blogpostsRouter = require('./blogposts/blogpostsRouter');

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use('/users', usersRouter);
server.use('/posts', postsRouter);
server.use('/tags', tagsRouter);
server.use('/blogposts', blogpostsRouter);

server.get('/', (req, res) => {
  res.json({ api: 'running...' });
});

server.listen(process.env.PORT || port, _ => {
  console.log(`API running on ${port}`);
});
