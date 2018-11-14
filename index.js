const express = require('express');
const helmet = require('helmet');
const knex = require("knex");
const knexConfig = require("./knexfile")

const db = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {

    res.status(200).json({api: "running"});
})

server.get("/api/cohorts", (req, res) => {
    db("cohorts")
        .then(cohorts => res.status(200).json({cohorts}))
        .catch(err => res.status(500).json({error: err}))
})

const port = 9001;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
