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
    .catch(error => response.json(error))
})

const port = 9999;
server.listen(port, () => {console.log(`#### Server active on port ${port} ####\n`)})