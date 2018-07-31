const express = require('express');

const db = require('./data/db')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('lets GO!');
})

server.get('/api/users', (req,res, next)=> {
  db('Users').then(users=> {
      console.log(users);
      res.json({users});
  }).catch(err => {
     res.status(500).json(err)
  })
})


server.get('/api/posts', (req, res, next) => {
    db('Posts').then(posts => {
        console.log(posts);
        res.json({
            posts
        });
    }).catch(err => {
        res.status(500).json(err)
    })
})

server.get('/api/tags', (req, res, next) => {
    db('Tags').then(tags => {
        console.log(tags);
        res.json({
            tags
        });
    }).catch(err => {
        res.status(500).json(err)
    })
})

const port = 8000;
server.listen(port, function () {
    console.log(`\n===Web API listening on http://localhost:${port} ===\n`)
})
