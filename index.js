const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');


const server = express();

//Initialize db
const db = knex(knexConfig.development);

//Connect Middleware to Server 
server.use(helmet(), express.json());

// SANITY CHECK
server.get('/', (request, response) => {
    response.send("Let's get it!")
});

// POST Endpoint 
server.post('/api/cohorts', (request, response) => {
    
    // Deconstruct Request Body
    const { name } = request.body;

    // Database Promise Functions
    db.insert({ name })
    .into('cohorts')
    .then( ids => {
        response.status(201).json(ids)
    })
    .catch(error => response.status(500).json(error))
});

// GET Cohorts Endpoints
server.get('/api/cohorts', (request, response) => {

    db('cohorts')
    .then(cohorts => {
        if (cohorts.length < 1) {
            return response.status(404).json({errorMessage: "No cohorts were found."})
        }
        response.status(200).json(cohorts)
    })
    .catch(error => response.status(500).json(error))
});

server.get('/api/cohorts/:id', (request, response) => {

    const { id } = request.params;

    db('cohorts')
    .where({ id })
    .then( cohort => {
        if (cohort.length < 1) {
            return response.status(404).json({errorMessage: "The cohort with the provided id could not be found."})
        }
        response.status(200).send(cohort);
    })
    .catch(error => {response.status(500).json(error)})
});

// GET Inividual Cohort Students Endpoint
server.get('/api/cohorts/:cohort_id/students', (request, response) => {

    const { cohort_id } = request.params;

    db('students')
    .where({ cohort_id })
    .then( students => {
        if (students.length < 1) {
            return response.status(404).json({message: "No students were found for that cohort."})
        }
        response.status(200).send(students);
    })
    .catch(error => {response.status(500).json(error)})
});

//PUT Cohort Endpoint 
server.put('/api/cohorts/:id', (request, response) => {

    const { id } = request.params;
    const { name } = request.body;
  
    db('cohorts')
    .where({ id })
    .update({ name })
    .then(updated => {
    if (!updated || updated < 1) {
        return response.status(400).send({errorMessage:`Unable to update the information of the cohort with the provided id.`})
    }
    response.status(200).json(updated)
  })
    .catch(error => response.status(500).send(error))
  });
  
// DELETE Cohort Endpoint 
server.delete('/api/cohorts/:id', (request, response) => {

    const { id } = request.params;
    
    db('cohorts')
    .where({ id })
    .del()
    .then(deleted => {
        if (!deleted || deleted < 1) {
        return response.status(400).send({errorMessage:`Unable to delete the cohort with the provided id.`})
        }
        response.status(200).json(deleted)
    })
    .catch(error => response.status(500).send(error))
    });

const port = 8888;
server.listen(port, () => {console.log(`\n#### Server running on port ${port} ####\n`)})