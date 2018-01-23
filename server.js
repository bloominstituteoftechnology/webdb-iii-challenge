const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./database/db');

const server = express();
server.use(bodyParser.json());

// users API
server.post('/users', (req, res) => {
  const user = req.body;
  knex.insert(user)
      .into('users')
      .then((ids) => {
        res.status(201).json({ ids });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
});

server.get('/users', (req, res) => {
  knex('users')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  knex('users')
    .where('id', id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.get('/users/:id/posts', (req, res) => {
  const { id } = req.params;
  knex('posts')
    .where('userId', id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  knex('users')
    .where('id', id)
    .update(update)
    .then((id) => {
      res.status(200).json({ id });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  knex('users')
    .where('id', id)
    .del()
    .then((id) => {
      res.status(204).json({ message: 'User Deleted Successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// posts API
server.post('/posts', (req, res) => {
  const post = req.body;
  knex.insert(post)
    .into('posts')
    .then((ids) => {
      res.status(201).json({ ids });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.get('/posts', (req, res) => {
  knex('posts')
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  knex('posts')
    .where('id', id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  knex('posts')
    .where('id', id)
    .update(update)
    .then((id) => {
      res.status(200).json({ id });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  knex('posts')
    .where('id', id)
    .del()
    .then((id) => {
      res.status(204).json({ message: 'Post Deleted Successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// tags API
server.post('/tags', (req, res) => {
  const tag = req.body;
  knex.insert(tag)
    .into('tags')
    .then((ids) => {
      res.status(201).json({ ids });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.get('/tags', (req, res) => {
  knex('tags')
    .then((tags) => {
      res.status(200).json(tags);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.get('/tags/:id', (req, res) => {
  const { id } = req.params;
  knex('tags')
    .where('id', id)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.put('/tags/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  knex('tags')
    .where('id', id)
    .update(update)
    .then((id) => {
      res.status(200).json({ id });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

server.delete('/tags/:id', (req, res) => {
  const { id } = req.params;
  knex('tags')
    .where('id', id)
    .del()
    .then((id) => {
      res.status(204).json({ message: 'Tag Deleted Successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Extra Credit
