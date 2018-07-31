const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());
const PORT = 3000;

const { usersConstraints, tagsConstraints } = require('./middleware');
const errors = require('./middleware/errors');

// endpoints here
server.get('/', (req, res) => {
  res.send('working...');
});

server.get('/api/users', async (req, res) => {
  try {
    const users = await db('users');
    res.status(200).json(users);
  } catch (err) {
    err => res.status(500).json(err);
  }
});

server.get('/api/users/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const users = await db
      .where('id', ID)
      .from('users')
      .first();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: `No user with id:${ID} exists.` });
    }
  } catch (err) {
    err => res.status(500).json(err);
  }
});

server.post('/api/users', usersConstraints, async (req, res) => {
  const NAME = req.body.name;
  const newUser = { name: NAME };

  try {
    const users = await db.insert(newUser).into('users');
    const user = users[0]; // returns an array, we want the first one
    res.status(201).json({ message: `Succesfully added user id:${user}` });
  } catch (err) {
    err => res.status(500).json(err);
  }
});

// error handling
server.use(errors);

// not found - 404
server.use((req, res) =>
  res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`),
);

server.listen(
  PORT,
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`),
);
