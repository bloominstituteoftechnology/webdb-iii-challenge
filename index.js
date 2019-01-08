const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const port = 5000;

server.use(express.json());


server.listen(port, () =>{
    console.log(`Server is up and running on port ${port}`)
})