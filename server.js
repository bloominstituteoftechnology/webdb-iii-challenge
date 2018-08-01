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
  res.status(500).json({error: 'The users could not be retrieved'})
});
});

//GET user by id
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  if(!id) {
    res.status(404).json({ error: 'The user ID does not exist'})
  }
  db('users')
  .where({id: Number(id)})
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json({error: 'The user could not be retrieved'})
  });
});

//GET posts for user by id
server.get('/users/:id/posts', (req, res) => {
  const { id } = req.params;
  if(!id) {
    res.status(404).json({ error: 'The user ID does not exist'})
  }
  db('posts')
  .join('users', 'posts.userId', 'users.id')
  .select('posts.text', 'users.name')
  .where('posts.id', id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json({error: 'The posts for user could not be retrieved'})
  });
})

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
    res.status(500).json({error: 'The user could not be created'})
  });
});

//PUT update user
server.put('/users/:id', (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  if(!id) {
    res.status(404).json({ error: 'The user ID does not exist'})
  }
  db('users')
  .where({ id: Number(id) })
  .update(user)
  .then(response => {
    res.status(201).json({ response });
  })
  .catch(err => {
    res.status(500).json({error: 'The user could not be updated'})
  });
});

//DELETE user
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  if(!id) {
    res.status(404).json({ error: 'The user ID does not exist'})
  }
  db('users')
  .where({ id: Number(id) })
  .delete()
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({error: 'The user could not be deleted'})
  });
});

//Post endpoints here
//GET array of posts
server.get('/posts', (req, res) => {
  db('posts').then(response => {
      res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json({error: 'The posts could not be retrieved'})
  });
  });

//GET post by id
server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  if(!id) {
    res.status(404).json({ error: 'The post ID does not exist'})
  }
  db('posts')
  .where({id: Number(id)})
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json({error: 'The post could not be retrieved'})
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
    res.status(500).json({error: 'The post could not be created'})
  });
});

//PUT update post
server.put('/posts/:id', (req, res) => {
  const { post } = req.body;
  const { id } = req.params;
  if(!id) {
    res.status(404).json({ error: 'The post ID does not exist'})
  }
  db('posts')
  .where({ id: Number(id) })
  .update(post)
  .then(response => {
    res.status(201).json({ response });
  })
  .catch(err => {
    res.status(500).json({error: 'The post could not be updated'})
  });
});

//DELETE post
server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  if(!id) {
    res.status(404).json({ error: 'The post ID does not exist'})
  }
  db('posts')
  .where({ id: Number(id) })
  .delete()
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({error: 'The post could not be deleted'})
  });
});

//Tag endpoints here
//GET array of tags
server.get('/tags', (req, res) => {
  db('tags')
  .then(response => {
      res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json({error: 'The tags could not be retrieved'})
  });
  });

  //GET tag by id
  server.get('/tags/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
      res.status(404).json({ error: 'The tag ID does not exist'})
    }
    db('tags')
    .where({id: Number(id)})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({error: 'The tag could not be retrieved'})
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
      res.status(500).json({error: 'The tag could not be created'})
    });
  });

  //PUT update tag
  server.put('/tags/:id', (req, res) => {
    const { tag } = req.body;
    const { id } = req.params;
    if(!id) {
      res.status(404).json({ error: 'The tag ID does not exist'})
    }
    db('tags')
    .where({ id: Number(id) })
    .update(tag)
    .then(response => {
      res.status(201).json({ response });
    })
    .catch(err => {
      res.status(500).json({error: 'The tag could not be updated'})
    });
  });

  //DELETE tag
  server.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
      res.status(404).json({ error: 'The tag ID does not exist'})
    }
    db('tags')
    .where({ id: Number(id) })
    .delete()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({error: 'The tag could not be deleted'})
    });
  });

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});