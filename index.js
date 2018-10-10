/// ----- Node Dependencies -----
const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');

/// ----- Initialize Server -----
const server = express();

/// ----- Initialize Database -----
const db = knex(knexConfig.development)

/// ----- Connect Middleware to Server -----
server.use(helmet(), express.json());


///// ---------- CRUD ENDPOINTS ----------

/// ----- Root Server READ Endpoint -----
server.get('/', (request, response) => {
    response.send("Dance magic, dance.")
})


/// ----- CREATE Cohort Endpoint ----- 
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
})

/// ----- READ All Cohort Endpoint ----- 
server.get('/api/cohorts', (request, response) => {
    db('cohorts')
    .then(cohorts => {
        if (cohorts.length < 1) {
            return response.status(404).json({errorMessage: "No cohorts were found."})
        }

        response.status(200).json(cohorts)
    })
    .catch(error => response.status(500).json(error))
})

const port = 9999;
server.listen(port, () => {console.log(`#### Server active on port ${port} ####\n`)})