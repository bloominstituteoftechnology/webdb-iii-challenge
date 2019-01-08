const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

//endpoints here

//saves a new cohort
server.post('/api/cohorts', (req, res) => {

})

//returns array of all cohorts
server.get('/api/cohorts', (req, res) => {
  
})

//returns cohort with matching id
server.get('/api/cohorts/:id', (req, res) => {
  
})

//returns all students for the cohort with the specified id
server.get('/api/cohorts/:id/students', (req, res) => {
  
})

// updates cohort with the matching id using info sent in body of request
server.put('/api/cohorts/:id', (req, res) => {
  
})

// deletes specified cohort
server.delete('/api/cohorts/:id', (req, res) => {
  
})