const express = require('express');

const server = express();

const db = require('./db/knexconfig');

server.use(express.json());

const port = process.env.PORT || 9000;

server.get('/', (req, res) => {
  db('cohorts')
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err));
});

server.listen(port, () => {
  console.log(`\n == Server listening on Port ${port} ==`);
});
