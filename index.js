const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

// endpoints here
server.get('/users', (req, res) => {
    db('users').then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err));
    
  });

  server.get('/users/:id', (req, res) => {
    db('users')
    .get(req.params.id - 1)
    .then(user => {
      if(!user) {
        res.status(404).json({ message: "ID DONT EXIST"});
      }
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: "That did not work haha"})
    });
  })

  server.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name)
    res.status(400).json({ errorMessage: "Required fields"});
    db.insert({ name }) 
    .into("users")
    .then(user => res.status(201).json({name})) 
    .catch(err => res.status(400).json({error: "Error posting"}))
  })

  ///////////////post 

  server.get('/posts', (req, res) => {
    db('posts').then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json(err));
    
  });

  server.post('/posts', (req, res) => {
    const { text } = req.body;
    if (!text)
    res.status(400).json({ errorMessage: "Text required"});
    db.insert({ text }) 
    .into("posts")
    .then(post => res.status(201).json({text})) 
    .catch(err => res.status(400).json({error: "Error posting"}))
  })

  server.get('/posts/:id', (req, res) => {
    db('posts')
    .get(req.params.id - 1)
    .then(post => {
      if(!post) {
        res.status(404).json({ message: "ID DONT EXIST"});
      }
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "That did not work haha"})
    });
  })






const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});