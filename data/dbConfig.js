const knex = require("knex");
const paginator = require("knex-paginator");
const knexConfig = require("../knexfile");
const environment = process.env.ENV || "development";
console.log(environment);
const db = knex(knexConfig.production);
paginator(db);
module.exports = db;
