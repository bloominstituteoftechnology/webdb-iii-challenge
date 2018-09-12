const express = require('express');
const knex = require("knex");
const cohortRoutes = require('./cohorts/cohortRoutes.js');
// const studentRoutes = require('./students/studentRoutes.js');

const dbconfig = require("./knexfile");
const db = knex(dbconfig.development);

const server = express();

server.use(express.json());


server.use('/api/cohorts', cohortRoutes);
// server.use('/students' , studentRoutes);

server.get('/', (req, res) => {
  res.send('API running...')
});



const port = 2200;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});