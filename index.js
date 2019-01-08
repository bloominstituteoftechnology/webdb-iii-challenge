const express = require("express");
const knex = requie("knex");
const server = express();

const dbConfig = require("./knexfile.js");
const PORT = 5000;
