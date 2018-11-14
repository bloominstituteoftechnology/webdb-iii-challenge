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
        .then(cohorts => res.status(200).json(cohorts))
        .catch(err => res.status(500).json({error: err}))
})

server.post("/api/cohorts", (req, res) => {
    const changes = req.body;

    if (changes.name === "" || changes.name === undefined) {
        return res.status(400).json({error: "Please make sure the cohort name is indexed."})
    }

    db("cohorts")
        .insert(changes)
        .then(id => res.status(200).json(id))
        .catch(err => res.status(500).json({error: err}))
})

const port = 9001;

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
