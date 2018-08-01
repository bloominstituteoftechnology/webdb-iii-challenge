const express = require('express');
const db = require('./db');
const wrapAsync = require('./utilities/wrapAsync');
const processPost = require('./utilities/processPost');
const makeRouter = require('./routers/makeRouter');

const server = express();
server.use(express.json());


server.get('/api/users/:id/posts', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const payload = await db('posts').where('userId', id).select();
  res.status(200).json(payload);
}));

server.get('/api/posts/:id/tags', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const tagIdObjs = await db('mapping_tags_post').where('postId', id).select();
  const tagIds = tagIdObjs.map(item => item.tagId);
  const posts = await db('tags').whereIn('id', tagIds).select();
  res.status(200).json(posts);
}));


server.use('/api/posts', makeRouter(db, 'posts', [((req, res, next) => processPost(req, res, next, db))]));
server.use('/api/users', makeRouter(db, 'users'));
server.use('/api/tags', makeRouter(db, 'tags'));

server.use((err, req, res, next) => {
  if (err.code === 'SQLITE_CONSTRAINT') {
    res.status(500).json('Database returned an error.');
  }
  res.status(err.code).json(err.message);
  next();
});


server.listen(8000, () => { console.log('Listening on Port 8000'); });
