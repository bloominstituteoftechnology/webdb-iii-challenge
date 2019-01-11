const express = require('express');
const knex = require('knex');
const server = express();
server.use(express.json());

//PORT
const PORT = 5000;
//Knex 
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);