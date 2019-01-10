const knex = require('knex')

const knexConfig = require('../../knexfile')
const db = knex(knexConfig.development)


module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    student
}


function find() {
    return db('cohorts')
}
function findById(id) {
    return db('cohorts')
        .where({ id })
        .first()
}

function add(cohort) {
    return db('cohorts')
        .insert(cohort)
        .into('cohorts')
}

function update(id, changes) {
    return db('cohorts')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('cohorts')
        .where({ id })
        .del()
}

function student(id) {
    return db('students')
        .where('cohort_id', id)

}