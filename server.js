const express = require('express');

const db = require('./data/db')

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('up and running... 35')
});

server.get('/users', (req, res) => {
    db('users').then(user => {
        res.status(200).json(user)
    }).catch(err => res.status(500).json(err))
});
server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    db('users')
    .where('id', '=', id)
    .then(user => {
        res.status(200).json(user)
    }).catch(err => res.status(500).json(err))
});

server.post('/users', (req, res) => {
    const user = req.body;

    db.insert(user).into('users').then(users =>{
        const id = users[0];
        res.status(201).json({id, ...user})
    }).catch(err => res.status(500).json(err))
})
server.delete('/users/:id', (req, res) => {//delete user
    const id = req.params.id;
    // posts = posts.filter(p => p.id != id)
    db('users')
    .where('id', '=', id)
    .del()
      .then(user => {
        if (user === 0) {
          res.status(404)
          .json({ error: "The u with the specified ID does not exist." })
        }
        res.status(200).json(user)
      }).catch(error => {
        res.status(500)
          .json({ error: "error 2." })
      });
  })
  server.put('/users/:id', (req, res) => {// update users
    const changes = req.body;
    const id = req.params.id;
  
    db('users')
      .where('id', '=', id) // or .where({ id: id })
      .update(changes)
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
      
  });
server.get('/posts', (req, res) => {// get all posts
    db('posts').then(pid => {
        res.status(200).json(pid)
    }).catch(err => res.status(500).json(err))
});

server.post('/posts', (req, res) => {// post new post
    const post = req.body;

    db.insert(post).into('posts').then(ids => {
        const id = ids[0];
        res.status(201).json({id, ...post})
    }).catch(err => res.status(500).json(err))
})
server.get('/posts/:id', (req, res) => {//get post by id
    const id = req.params.id;
    db('posts')
    .where('id', '=', id)
    .then(post => {
        res.status(200).json(post)
    }).catch(err => res.status(500).json(err))
});
server.put('/posts/:id', (req, res) => {// update posts
    const changes = req.body;
    const id = req.params.id;
  
    db('posts')
      .where('id', '=', id) // or .where({ id: id })
      .update(changes)
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
      
  });
  server.delete('/posts/:id', (req, res) => {//delete post
    const id = req.params.id;
    
    db('posts')
    .where('id', '=', id)
    .del()
      .then(post => {
        if (post === 0) {
          res.status(404)
          .json({ error: "The post with the specified ID does not exist." })
        }
        res.status(200).json(post)
      }).catch(error => {
        res.status(500)
          .json({ error: "error 2." })
      });
  })
server.get('/tags', (req, res) => {// get all tags
    db('tags').then(tag => {
        res.status(200).json(tag)
    }).catch(err => res.status(500).json(err))
});

server.post('/tags', (req, res) => {// post a new tag
    const tag = req.body;

    db.insert(tag).into('tags').then(ids => {
        const id = ids[0];
        res.status(201).json({id, ...tag})
    }).catch(err => res.status(500).json(err))
})
server.get('/tags/:id', (req, res) => {//get tag by id
    const id = req.params.id;
    db('tags')
    .where('id', '=', id)
    .then(tag => {
        res.status(200).json(tag)
    }).catch(err => res.status(500).json(err))
});
server.delete('/tags/:id', (req, res) => {//delete tag
    const id = req.params.id;
    
    db('tags')
    .where('id', '=', id)
    .del()
      .then(tag => {
        if (tag === 0) {
          res.status(404)
          .json({ error: "The tag with the specified ID does not exist." })
        }
        res.status(200).json(tag)
      }).catch(error => {
        res.status(500)
          .json({ error: "error 2." })
      });
  })
  server.put('/tags/:id', (req, res) => {// update tags
    const changes = req.body;
    const id = req.params.id;
  
    db('tags')
      .where('id', '=', id) // or .where({ id: id })
      .update(changes)
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
      
  });

const port = 3500;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});