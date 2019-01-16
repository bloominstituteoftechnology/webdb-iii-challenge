const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 8070;

server.use(express.json());

server.get('/api/cohorts', (req, res) => {
    // I'm a get
})

server.get('/api/cohorts/:id', (req, res) => {
    // I'm a get by id
})

server.get('/api/cohorts/:id/students', (req, res) => {
    // I'm a get-some-students-by-cohort-id
})


server.post('/api/cohorts', (req, res) => {
    // I'm a post request
})

server.put('/api/cohorts/:id', (req, res) => {
    // I'm a put request
})

server.delete('/api/cohorts/:id', (req, res) => {
    // I'm a delete request
})

server.listen(PORT, () => {
    console.log(`I'm alive, awake, alert, and enthusiastic on port ${PORT}`)
})