// initialize server
const express = require('express');
const knex = require('knex');
// const cohorts = require('./data/routers/cohorts');
// const students = require('./data/routers/students');

// initialize db
const dbConfig = require('./knexfile.js');
const db = knex(dbConfig.development);

// server variables and middleware
const port = process.env.PORT || 5000;
const parser = express.json();
const helmet = require('helmet');

// initiate...
const server = express();

server.use(
    helmet(),
    parser
);

// define routes and activate server
// server.use('/api/projects', projects);
// server.use('/api/actions', actions);
server.listen(port, () => console.log(`\nrunning on ${port}\n`));

module.exports = db;