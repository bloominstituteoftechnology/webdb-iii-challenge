const express = require('express');

const bodyParser = require('body-parser');

const sqlite = require('sqlite3');
const knex = require('./db.js');

const server = express();

server.use(bodyParser.json());

// routes

server.get('/', (req, res) => {
    res.status(200).json({ success: true });
});

const port = 3000;
server.listen(port, () => {
    console.log(`server running at ${port}`);
})
