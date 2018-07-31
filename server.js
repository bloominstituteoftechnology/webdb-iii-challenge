const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

// User endpoints here

//GET array of users
server.get('/users', (req, res) => {
db('users').then(response => {
    res.status(200).json(response);
})
.catch(err => {
  res.status(500).json(err)
});
});

//GET user by id
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db('users')
  .where({id: Number(id)})
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json(err)
  });
});

//GET posts for user by id

//POST user
server.post('/users', (req, res) => {
  const { user } = req.body;
  db
  .insert(user)
  .into('users')
  .then(ids => {
    const id = ids[0];
    res.status(201).json({ id, ...user })
  })
  .catch(err => {
    res.status(500).json(err)
  });
});

//PUT update user

//DELETE user


//Post endpoints here
//GET array of posts
server.get('/posts', (req, res) => {
  db('posts').then(response => {
      res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json(err)
  });
  });

//GET post by id
server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db('posts')
  .where({id: Number(id)})
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json(err)
  });
});

//POST new post
server.post('/posts', (req, res) => {
  const { post } = req.body;
  db('posts')
  .insert(post)
  .then(ids => {
    const id = ids[0];
    res.status(201).json({ id, ...post })
  })
  .catch(err => {
    res.status(500).json(err)
  });
});

//PUT update post

//DELETE post


//Tag endpoints here
//GET array of tags
server.get('/tags', (req, res) => {
  db('tags').then(response => {
      res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json(err)
  });
  });

  //GET tag by id
  server.get('/tags/:id', (req, res) => {
    const { id } = req.params;
    db('tags')
    .where({id: Number(id)})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err)
    });
  });
  //POST new tag
  server.post('/tags', (req, res) => {
    const { tag } = req.body;
    db('tags')
    .insert(tag)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...tag })
    })
    .catch(err => {
      res.status(500).json(err)
    });
  });
  //PUT update tag

  //DELETE tag

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});