const express = require('express');

const db = require('./data/db');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('up and running...');
});

server.get('/users', (req, res) => {
	db('users')
	.then(response => {
		res.status(200).json(response);
	})
	.catch(err => res.status(500).json(err));
});

server.get('/users', (req, res) => {
  db('posts').where('id', req.params.id)
	.then(response => {
		res.status(200).json(response);
	})
	.catch(err => res.status(500).json(err));
});

server.post('/users', (req, res) => {
  const user = req.body;
  db.insert(user).into('users').then(ids => {
    const id = ids[0];
    res.status(201).json({ id, ...user})
  }).catch(err => res.status(500).json(err));
});

server.get('/posts', (req, res) => {
	db('posts')
	.then(response => {
		res.status(200).json(response);
	})
	.catch(err => res.status(500).json(err));
});

server.post('/posts', (req, res) => {
  const post = req.body;
  db.insert(post).into('posts').then(ids => {
    const id = ids[0];
    res.status(201).json({ id, ...post})
  }).catch(err => res.status(500).json(err));
});

server.get('/tags', (req, res) => {
	db('tags')
	.then(response => {
		res.status(200).json(response);
	})
	.catch(err => res.status(500).json(err));
});

server.post('/tags', (req, res) => {
  const tag = req.body;
  db.insert(tag).into('tags').then(ids => {
    const id = ids[0];
    res.status(201).json({ id, ...tag})
  }).catch(err => res.status(500).json(err));
});

const port = 8000;

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
