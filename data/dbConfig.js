const knex = require("knex");
const knexConfig = require("../knexfile");
let environment = process.env.ENV || "production";
module.exports = knex(knexConfig[environment]);
