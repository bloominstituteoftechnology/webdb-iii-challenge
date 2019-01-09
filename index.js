const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.listen(3030, () => {
    console.log("Server started on port 3030.");
})

server.get("/api/cohorts", (req, res) => {
    db("cohorts")
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})