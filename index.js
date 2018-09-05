const express = require('express');
const knex = require('knex');
const server = express();

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

server.use(express.json());

