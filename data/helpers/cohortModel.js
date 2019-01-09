const knex = require('knex')

const knexConfig = require('../../knexfile')
const db = knex(knexConfig.development)


module.exports = {
    find,
    findById,
    add,
    update,
    remove
}


function find() {
    return db('cohort')
}

