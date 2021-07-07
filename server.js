const express = require('express');

const db= require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res)=> {
    res.send('up and running...');
  });

//////////////////////// Users //////////////////////

server.get('/users', (req, res) => {
    db('users')
    .then(users=> {
        res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/users/:id', (req, res) => {
    const {id}= req.params;
    db('users')
    .where({id})
    .then(users=>{
        res.status(200).json(users);
    })
    .catch(err=> res.status(500).json(err));
});

server.post('/users', (req, res) => {
    const user=req.body;
    db.insert(user)
        .into('users')
        .then(ids=> {
            const id= ids[0];
            res.status(200).json(id, ...user);
        })
        .catch( err => {
            res.status(500).json(err);
        });
});

server.put('/users/:id', (req, res) => {
    const changes=req.body;
    const {id} =req.params;
    db('users')
        .where('id', '=', id)
        .update(changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err =>{
            res.status(500).json(err);
        });
});

server.delete('/users/:id', (req, res)=> {
    const {id}= req.params;
    db('users')
        .where({id})
        .del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

///////////////////// Posts ///////////////////////

server.get('/posts', (req, res)=> {
    db('posts')
    .then(post=> {
        res.status(200).json(post);
    })
    .catch(error=> {
        res.status(500).json(error)
    })
});

server.get('/posts/:id', (req, res) => {
    const {id}= req.params;
    db('posts')
    .where({id})
    .then(posts=>{
        res.status(200).json(posts);
    })
    .catch(err=> res.status(500).json(err));
});

server.post('/posts', (req, res)=> {
    const posts= req.body;
    db.insert(posts)
    .into('posts')
    .then(ids=> {
        const id= ids[0];
        res.status(200).json(id, ... posts)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});