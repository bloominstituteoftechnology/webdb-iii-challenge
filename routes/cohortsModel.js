const knex = require('knex');
const knexConfig = require('../knexfile.js');

//connection to the data base
const db = knex(knexConfig.development);

module.exports = {
    findCohorts, 
    findCohortById,
    addCohort,
    updateCohort,
    removeCohort,
    findStudents

}

function findCohorts() {
    return db('cohorts');
}

function findCohortById(id) {
    return db('cohorts').where({id}).first();
}

function addCohort(course){
    return db('cohorts')
    .insert(course)
    .into('cohorts');
}

function updateCohort(id, changes) {
    return db('cohorts').where({id})
    .update(changes)
}

function removeCohort(id) {
    return db('cohorts')
    .where({id})
    .del();
}

function findStudents(cohort_id){
    return db('students').where({cohort_id});
}