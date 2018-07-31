const express = require('express');
const db = require('./db');
const makeRouter = require('./routers/makeRouter');

const server = express();
server.use(express.json());

server.use('/api/users', makeRouter(db, 'users'));
server.use('/api/posts', makeRouter(db, 'posts'));
server.use('/api/tags', makeRouter(db, 'tags'));

server.use((err, req, res, next) => {
  if (err.code === 'SQLITE_CONSTRAINT') {
    res.status(500).json('Database returned an error.');
  }
  res.status(err.code).json(err.message);
  next();
})


server.listen(8000, () => { console.log('Listening on Port 8000'); });
