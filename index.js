const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile.js');

const db =knex(dbConfig.development);
const PORT = 42;
const server = express();

server.use(express.json());

server.get('/api/cohorts', (req, res) => {

})

server.get('/api/cohorts/:id', (req, res) => {

})

server.post('/api/cohorts', (req, res) => {

})

server.put('/api/cohorts/:id', (req, res) => {

})

server.delete('/api/cohorts/:id', (req, res) => {

})