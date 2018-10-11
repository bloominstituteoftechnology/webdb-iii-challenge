const express = require('express');
// const knex = require('knex');
// const knexConfig = require('./knexfile.js');

// const db = //connect a database

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('API working') 
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
