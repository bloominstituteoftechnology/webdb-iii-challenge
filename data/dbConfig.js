const knex = require("knex");
const knexConfig = require("../knexfile");
const environment = process.env.ENV || "production";
module.exports = knex(knexConfig.development);
