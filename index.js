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

server.get('/posts', (req, res) => {
	db('posts')
	.then(response => {
		res.status(200).json(response);
	})
	.catch(err => res.status(500).json(err));
});

server.get('/tags', (req, res) => {
	db('tags')
	.then(response => {
		res.status(200).json(response);
	})
	.catch(err => res.status(500).json(err));
});

const port = 8000;

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
