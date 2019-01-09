const express = require("express");
const knex = require("knex");

const dbConfig = require("./knexfile");

const server = express();
const db = knex(dbConfig.development);

const PORT = 5050;

server.use(express.json());

server.post;

server.get;

server.get;

server.get;

server.put;

server.delete;

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
