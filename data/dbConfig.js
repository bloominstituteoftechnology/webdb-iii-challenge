const knex = require("knex");
const knexConfig = require("../knexfile");
let environment = process.env.ENV || "development";
module.exports = knex(knexConfig[environment]);
