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

  server.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name)
    res.status(400).json({ errorMessage: "Required fields"});
    db.insert({ name }) 
    .into("users")
    .then(user => res.status(201).json({name})) 
    .catch(err => res.status(400).json({error: "Error posting"}))
  })






const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});