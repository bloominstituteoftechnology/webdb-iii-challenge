const knex = require('knex')

const knexConfig = require('../../knexfile')
const db = knex(knexConfig.development)

// Data Access Layer

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}


function find() {
    return db('students')
}
