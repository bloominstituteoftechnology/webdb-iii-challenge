const express = require('express');
const db = require('./db');
const wrapAsync = require('./utilities/wrapAsync');
const processPost = require('./utilities/processPost');
const makeRouter = require('./routers/makeRouter');

const server = express();
server.use(express.json());

// handles get request for all posts by user
server.get('/api/users/:id/posts', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const payload = await db('posts').where('userId', id).select();
  res.status(200).json(payload);
}));

// handles get request for all tags by post
server.get('/api/posts/:id/tags', wrapAsync(async (req, res) => {
  const { id } = req.params;
  const tagIdSubQuery = db('mapping_tags_post').where('postId', id).select('tagId');
  const posts = await db('tags').where('id', 'in', tagIdSubQuery).select();
  res.status(200).json(posts);
}));

// Sets up different routes for posts, users, and tags. processPost is passed as middleware to
// posts route to add userName and tags to the post or post array to be returned
server.use('/api/posts', makeRouter(db, 'posts', [((req, res, next) => processPost(req, res, next, db))]));
server.use('/api/users', makeRouter(db, 'users'));
server.use('/api/tags', makeRouter(db, 'tags'));

// Handle errors
server.use((err, req, res, next) => {
  if (err.code === 'SQLITE_CONSTRAINT') {
    res.status(500).json('Database returned an error.');
  }
  res.status(err.code).json(err.message);
  next();
});


server.listen(8000, () => { console.log('Listening on Port 8000'); });
