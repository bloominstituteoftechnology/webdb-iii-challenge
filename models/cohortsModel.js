const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    post,
    getAll,
    getById,
    put,
    del,
    findStudentsByCohort
};

function post(cohort){
    return db('cohorts').insert(cohort).into('cohorts');
};

function getAll(){
    return db('cohorts');
};

function getById(id){
    return db('cohorts').where({id}).first();
};

function put(id, changes){
    return db('cohorts').where({id}).update(changes);
};

function del(id){
    return db('cohorts').where({id}).del();
};

function findStudentsByCohort(cohortId){
    return db('students').where('cohort_id', cohortId);
};