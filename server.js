const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config');

const usersRouter = require('./users/usersRouter');
const postsRouter = require('./posts/postsRouter');
const tagsRouter = require('./tags/tagsRouter');
const blogpostsRouter = require('./blogposts/blogpostsRouter');

const server = express();

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

// SELECT * FROM `rdbms-api-full_db`.blogposts
// JOIN tags ON blogposts.tag = tags.tag
// JOIN posts ON blogposts.postId = posts.id
// JOIN users ON users.id = posts.userId
// WHERE postId = 5
