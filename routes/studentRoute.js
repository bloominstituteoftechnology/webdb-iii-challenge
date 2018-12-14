const express = require("express");
const knex = require("knex");

const router = express.Router();

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = router;
