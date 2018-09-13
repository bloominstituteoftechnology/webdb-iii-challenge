const express = require('express');
const helmet = require('helmet');
const knex = require('knex')
const server = express();
const dbConfig = require('./db/knexfile')

const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
 
server.get('/', (req, res) => {
  res.send('Api Online')
})

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json(err))
  })
  
  server.post('/api/cohorts', (req, res) => {
    db.insert(cohorts)
    .into('cohorts')
    .then(id => {
      res.status(201).json(id)
    })
    .catch(err => res.status(500).json(err))
  })
  
  server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params
  
    db('cohorts')
    .where({id}).update(req.body)
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => res.status(500).json(err))
  })
  
  server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
     db("cohorts")
      .where({ id })
      .del()
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  })



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});