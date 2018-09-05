const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const dbConfig = require('./knexfile');
const knex = require('knex');

const db = knex(dbConfig.development);

server.use(bodyParser.json());

server.get('/cohorts', (req, res) => {
  db('cohorts')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.get('/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.post('/cohorts', (req, res) => {
  db.insert(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.put('/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .update(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.delete('/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .del()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.listen(3000, () => {
  console.log(('== LISTENING ON PORT 3000 =='));
})
