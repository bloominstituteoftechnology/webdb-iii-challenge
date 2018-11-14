const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());


// ___________ POST Cohort_______________
//[POST] /api/cohorts This route should save a new cohort to the database.
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos')
    .insert(zoo)
    //.returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })

    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});


// ___________ GET Cohort_______________
//[GET] /api/cohorts This route will return an array of all cohorts.
//[GET] /api/cohorts/:id This route will return the cohort with the matching id.
//[GET] /api/cohorts/:id/students returns all students for the cohort with the specified id.

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
  .where({ id:id })
  .then(zoos => res.status(200).json(zoos))
  .catch(err => res.status(500).json(err));
});
// ___________ PUT Cohort______________
//[PUT] /api/cohorts/:id This route will update the cohort with the matching id
        // using information sent in the body of the request.

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  
  db('zoos')
    .where({ id:id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// ___________ DELETE Cohort _______________
//[DELETE] /api/cohorts/:id This route should delete the specified cohort.
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id:id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});


const port = 4400;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
