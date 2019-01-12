const express = require('express');
const knex = require('./knexfile');

const server = express();

server.use(express.json());