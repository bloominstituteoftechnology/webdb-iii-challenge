const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 5050;

server.use(express.json());

//---------------Create--------------

server.post('/api/cohorts', (req, res) => {

})

//---------------Read----------------

server.get('/api/cohorts', (req, res) => {

})

server.get('/api/cohorts/:id', (req, res) => {

})

server.get('/api/:id/students', (req, res) => {

})

//---------------Update--------------

server.put('/api/cohorts/:id', (req, res) => {

})

//---------------Destroy-------------

server.delete('/api/cohorts/:id', (req, res) => {

})

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

