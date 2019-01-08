const express = require('express');
const knex = require('knex');

const dbConfig=require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const Port = 4400;

server.use(express.json());


server.listen(Port, ()=>{
    console.log(`Server is running on Port: ${PORT}`)
})