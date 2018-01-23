const config = require('../knexfile.js');
const knex = require('knex')(config.development);

module.exports = knex;



// npm install --save knex
// npm install -g knex
// knex init
// npm install --save sqlite3