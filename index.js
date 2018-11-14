const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const port = 9000;
const server = express();

server.listen(9000, () => console.log(`API running on port ${port}`));
