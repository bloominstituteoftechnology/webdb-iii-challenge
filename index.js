const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();
const port = 9000;

server.use(express.json());

server.get("/", (req, res) => {
    res.json("alive");
});

server.get("/api/cohorts", (req, res) => {
    db("cohorts")
        .then(cohorts => res.status(200).json(cohorts))
        .catch(err => res.status(500).json({ error: err }));
});



server.listen(port, () => console.log(`\n== Port ${port} ==\n`));
