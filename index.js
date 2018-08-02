const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// endpoints here

/////////////////////users
server.get('/users', (req, res) => {
    db('users').then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err));
    
  });

  server.get('/users/:id', (req, res) => {
    db('users')
    .where("id", req.params.id)
    .then(user => {
      if(user.length === 0) {
        res.status(404).json({ message: "ID DONT EXIST"});
      }
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: "That did not work haha"})
    });
  })

  server.get('/users/:id/posts', (req, res) => {
      db('posts')
      .where('userId', req.params.id)
      .then(posts => {
          if (posts.length === 0) {
              res.status(200).send({error: "This user has not posted"});
          }
          res.status(200).json(posts);
      })
      .catch(err => res.status(500).json(err));
  })

  server.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name || name.length > 128)
    res.status(400).json({ errorMessage: "Required fields"});
    db.insert({ name }) 
    .into("users")
    .then(user => res.status(201).json({name})) 
    .catch(err => res.status(400).json({error: "Error posting"}))
  })

  server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users')
    .where('id', (id))
    .delete()   
    .then(user => {
        if(user === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleteing post"})
    });
})

  server.put('/users/:id', (req, res) => {
    const name = req.body;
    const { id } = req.params
    if(!name)
    res.status(400).json({ errorMessage: "Provide name please"});
    db('users')
    .where("id",(id))
    .update(name)
    // .into('users')line is not needed
    .then(user => {
        if(!user) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(name);
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });
})

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////post 

  server.get('/posts', (req, res) => {
    db('posts').then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json(err));
    
  });

  server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db('posts')
    .where("id", (id))
    .then(post => {
      if(post.length === 0) {
        res.status(404).json({ message: "ID DONT EXIST"});
      }
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "That did not work haha"})
    });
  })

  server.get('/posts/:id/tags', (req, res) => {
    db('tags')
    .where('userId', req.params.id)
    .then(tags => {
        if (tags.length === 0) {
            res.status(200).send({error: "No tags for post"});
        }
        res.status(200).json(tags);
    })
    .catch(err => res.status(500).json(err));
})

  server.post('/posts', (req, res) => {
    const {userId, text } = req.body;
    if (!userId || !text)
    res.status(400).json({ errorMessage: "Text required"});
    db.insert({ text, userId }) 
    .into("posts")
    .then(post => res.status(201).json({text, userId})) 
    .catch(err => res.status(400).json({error: "Error posting"}))
  })

  server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db('posts')
    .where('id', (id))
    .delete()   
    .then(post => {
        if(post === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleteing post"})
    });
})

server.put('/posts/:id', (req, res) => {
    const text = req.body;
    const { id } = req.params
    if(!text)
    res.status(400).json({ errorMessage: "Provide text and userId please"});
    db('posts')
    .where("id", (id))
    .update(text)
    // .into('users')line is not needed
    .then(post => {
        if(!post) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json(text);
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////tags


server.get('/tags', (req, res) => {
    db('tags').then(tag => {
      res.status(200).json(tag);
    })
    .catch(err => res.status(500).json(err));
    
  });

  server.get('/tags/:id', (req, res) => {
    const { id } = req.params;
    db('tags')
    .where("id", (id))
    .then(tag => {
      if(tag.length === 0) {
        res.status(404).json({ message: "ID DONT EXIST"});
      }
      res.status(200).json(tag);
    })
    .catch(error => {
      res.status(500).json({ error: "That did not work haha"})
    });
  })

  server.post('/tags', (req, res) => {
    const { tag, userId } = req.body;
    if (!tag || !userId || tag.length > 16)
    res.status(400).json({ errorMessage: "Tag required"});
    db.insert({ tag, userId }) 
    .into("tags")
    .then(post => res.status(201).json({tag})) 
    .catch(err => res.status(400).json({error: "Error posting"}))
  })

  server.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    db('tags')
    .where('id', (id))
    .delete()   
    .then(tag => {
        if(tag === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleteing post"})
    });
})

server.put('/tags/:id', (req, res) => {
    const tag = req.body;
    const { id } = req.params
    if(!tag)
    res.status(400).json({ errorMessage: "Provide tag please"});
    db('tags')
    .where("id", (id))
    .update(tag)
    // .into('users')line is not needed
    .then(tag => {
        if(!tag) {
            res.status(404).json({ message: "ID doesn't exist"});
        }
        res.status(200).json({tag, message: "Success Updating"});
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });
})





const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});