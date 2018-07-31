const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('Up and running!');
})

server.get('/users', async (req, res) => {
  try {
    const users = await db('Users');
    res.status(200).json(users);
  } catch(err) {
    res.status(500).send(`You done goofed with ${err}`);
  }
});

server.post('/users', async (req,  res) => {
  const name = req.body;
  try {
    const ids = await db.insert(name).into('users');
    const id = ids[0];
    res.status(201).json({id, ...name});
  } catch(err) {
    res.status(500).send(`Ya done goofed with ${err}`);
  }
})

server.delete('/users/:id', async (req, res) => {
  try {
    const result = await db('Users').where('id', req.params.id).del();
    res.status(200).json(result);
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

server.put('/users/:id', async (req, res) => {
  const name = req.body;
  try {
    const index = await db('users').where('id', req.params.id).update(name);
    if (index > 0) return res.status(200).json(await db('Users').where('id', req.params.id).first());
    res.status(200).send("If didn't trigger");
  } catch(err) {
    res.status(500).send(`Try again and ${err}`);
  }
})

const port = 3000;
server.listen(port, () => {console.log(`Server is listening on port ${port}`)})
