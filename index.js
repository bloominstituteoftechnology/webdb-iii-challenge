const express = require('express');

const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.Development);

const server = express();

server.use(express.json());

server.post('/characters', (req, res) => {
  // we'll add our database code here shortly
  server.post('/characters', (req, res) => {
    const character = req.body;
  
    db.insert(character)
      .into('characters')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.put('/characters/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('characters')
      .where('id', '=', id) // or .where({ id: id })
      .update(changes)
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.delete('/characters/:id', (req, res) => {
    const { id } = req.params;
  
    db('characters')
      .where({ id }) // or .where(id, '=', id)
      .del()
      .then(count => {
        // count === number of records deleted
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
});

server.listen(8000, () => console.log('Running on port 8000'));