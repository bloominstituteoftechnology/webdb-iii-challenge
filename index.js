const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 5434;

server.use(express.json());

server.get('/', (req, res) => {
    res.json({message: "Server up and running!!"})
});




// Keep this at bottom of file!!
server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});