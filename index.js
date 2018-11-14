const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

// endpoints here
//GET..
server.get('/', (request, response) => {
    response.send('ACTIVE...');
    //response.json('ACTIVE...');
})

//GET../api/cohorts
server.get('/api/cohorts', (request, response) => {
    db('cohorts')
            .then(cohorts => response.status(200).json(cohorts))
            .catch(error => response.status(500).json(error));
})

//GET../api/cohorts/:id
server.get('/api/cohorts/:id', (request, response) => {
    db('cohorts')
            .where({ id : request.params.id })
            .then(cohort => response.status(200).json(cohort))
            .catch(error => response.status(500).json(error));
})

//GET ..api/cohorts/:id/students
server.get('/api/cohorts/:id/students', (request, response) => {
    db('students')
            .where({ id : request.params.id })
            .then(student => response.status(200).json(student))
            .catch(error => response.status(500).json(error));
})

//POST ../api/cohorts
server.post('/api/cohorts', (request, response) => {
          db.insert(request.body)
            .into('cohorts')
            .then(cohorts => response.status(200).json(cohorts))
            .catch(error => response.status(500).json(error));
})

//PUT 
server.put('/api/cohorts/:id', (request, response) => {
  db('cohorts')
        .where({ id : request.params.id })
        .update(request.body)
        .then(cohort => response.status(200).json(cohort))
        .catch(error => response.status(500).json(error));
})

//DELETE 
server.delete('/api/cohorts/:id', (request, response) => {
  db('cohorts')
        .where({ id : request.params.id })
        .del()
        .then(cohort => response.status(200).json(cohort))
        .catch(error => response.status(500).json(error));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
