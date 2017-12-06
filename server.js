const express = require('express');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
const db = require('./db.js');

const server = express();
server.use(bodyParser.json());

const SERVER_STATUS_ERROR = 500;
const USER_STATUS_ERROR = 422;
const STATUS_OK = 200;

// [GET] `/users/:id/posts` returns all posts for the user with the specified `id`.

server.post('/users',(req, res) => {
  const user = req.body;
  db
    .insert(user)
    .into('users')
    .then((user) => {
      res.status(STATUS_OK).json({created: user})
    })
    .catch(err => {
      re.status(SERVER_STATUS_ERROR).json({ error: err.message });
    });
});
server.get('/users', (req, res) => {
  db('users')
    .then((post) => {
      res.status(STATUS_OK).json(post);
    })
    .catch(err => {
      res.status(SERVER_STATUS_ERROR).json({ error: err.message });
    });
});
server.get('/users/:user_id', function(req, res) {
  const { user_id } = req.params;
  const USER_STATUS_ERROR = db('users')
    .where('user_id', user_id)
    .then(function(user) {
      res.status(200).json(user);
    })
    .catch(function(err) {
      res.status(500).json({ error: err.messsage });
    });
});
server.get('/users/:id/posts', (req, res) => {
  const { user_id } = req.params;
  const user = db('users')
    .where('id', user_id)
    .then(function(user) {
      const { user_id } = req.body;
      const post = db('post')
        .where('user_id', user_id)
        .then(post => {
          res.status(STATUS_OK).json(post)
        })
        .catch(err => {
          res.status(USER_STATUS_ERROR).json({ error: err.message })
        });
    })
    .catch(function(err) {
      res.status(500).json({ error: err.messsage });
    });
});
server.put('/users/:id', (req, res) => {
  db('users')
    .where('user_id', req.params.id)
    .update(req.body)
    .then((user) => {
      res.status(STATUS_OK).json({ sucess: true })
    })
    .catch(err => {
      res.status(USER_STATUS_ERROR).json({ error: err.message });
    });
});
server.delete('/users/:user_id', (req, res) => {
  const { user_id } = req.params;
  db('users')
    .where('user_id', user_id)
    .del()
    .then(user => {
      res.status(STATUS_OK).json({ sucess: true });
    })
    .catch(err => {
      res.status(SERVER_STATUS_ERROR).json({ error: err.message });
    });
});
// Posts
server.post('/posts',(req, res) => {
  const post = req.body;
  db
    .insert(post)
    .into('posts')
    .then((post) => {
      res.status(STATUS_OK).json(post)
    })
    .catch(err => {
      res.status(SERVER_STATUS_ERROR).json({error: err.message })
    });
});
server.get('/posts', (req, res) => {
  db('posts')
    .then((post) => {
      res.status(STATUS_OK).json(post);
    })
    .catch(err => {
      res.status(SERVER_STATUS_ERROR).json({ error: err.message });
    });
});
server.get('/posts/:post_id', function(req, res) {
  const { post_id } = req.params;
  const post = db('posts')
    .where('post_id', post_id)
    .then(function(post) {
      res.status(200).json(post);
    })
    .catch(function(err) {
      res.status(500).json({ error: err.messsage });
    });
});
server.delete('/posts/:id', (req, res) => {
  db('posts')
    .where('post_id', req.params.id)
    .del()
    .then(post => {
      res.status(STATUS_OK).json({ success : true });
    })
    .catch(err => {
      res.status(SERVER_STATUS_ERROR).json({ error: err.message });
    });
});
// Tags
server.post('/tags',(req, res) => {
  const tag = req.body;
  db
    .insert(tag)
    .into('tags')
    .then((tag) => {
      res.status(STATUS_OK).json(tag)
    })
    .catch(err => {
      res.status(SERVER_STATUS_ERROR).json({ error: err.message })
    })
});
server.get('/tags', (req, res) => {
  db('tags')
    .then((post) => {
      res.status(STATUS_OK).json(post);
    })
    .catch(err => {
      res.status(SERVER_STATUS_ERROR).json({ error: err.message });
    });
});
server.get('/tags/:tag_id', function(req, res) {
  const { tag_id } = req.params;
  const user = db('tags')
    .where('tag_id', tag_id)
    .then(function(tag) {
      res.status(200).json(tag);
    })
    .catch(function(err) {
      res.status(500).json({ error: err.messsage });
    });
});
server.delete('/tags/:id', (req, res) => {
  db('tags')
    .where('tag_id', req.params.id)
    .del()
    .then(tag => {
      res.status(STATUS_OK).json({ success: true });
    })
    .catch(err => {
      res.status(SERVER_STATUS_ERROR).json({ error: err.message });
    });
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});