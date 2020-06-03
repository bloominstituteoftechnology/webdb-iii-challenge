const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());


server.get('/api/cohorts', (req, res) => {
  db('cohorts')
      .then(cohorts => {
      res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json({ errorMessage: 'cohort info not retrievied' }));
  })
      
  server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
   db.insert(cohort)
      .into('cohorts')
      .then(id => {
      res.status(201).json(id);
      })
      .catch(err => res.status(500).json({ errorMessage: 'error adding cohort' }));
  });
   server.put('/api/cohorts/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
   db('cohorts')
      .where('id', '=', id)
      .update(changes)
      .then(count => {
      res.status(200).json({ message: `Succes. ${count} updated.` })
      })
      .catch(err => {
      res.status(500).json({ errorMessage: 'Update aint work.'})
      });
  });
   server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
   db('cohorts')
      .where({ id })
      .del()
      .then(count => {
      res.status(200).json({ message: `${count} deleted.`})
      })
      .catch(err => {
      res.status(500).json({ errorMessage: 'Error while trying to delete' })
      });
  });


const port = 9001;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on power (port) level ${port} ===\n`);
});