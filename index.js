const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req,res) => {
    res.send("API RUNNING!")
});

const port = 9000;
server.listen(port, () => {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
});