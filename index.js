
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js')

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());


const port = process.env.PORT || 9090;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));