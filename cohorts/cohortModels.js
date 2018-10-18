// separate knex handler incase of db change
const knex = require('knex');
// grabbing knexfile.js created by knex init
// contains the SQLite database - cohorts table
const knexConfig = require('../knexfile.js');
// configure together
const db = knex(knexConfig.development);

// export the Knex queries
module.exports = {
    find
}

function find() {
    return db('cohorts')
}