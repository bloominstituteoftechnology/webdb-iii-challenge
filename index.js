const express = require('express');
const knex = require('knex');
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());
server.use(helmet());
