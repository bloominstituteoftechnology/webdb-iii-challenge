const knex = require('knex');

const knexConfig = require('../../knexfile.js');
const db = knex(knexConfig.development);

const find = (id) => {
    if(id) {
        return db('cohorts')
            .where({id})
            .first();
    } else {
        return db('cohorts');
    }
};

const findStudentsByCohort = (cohort_id) => {
    return db('students')
        .where({cohort_id});
};

const add = (newCohort) => {
    return db('cohorts')
        .insert(newCohort)
        .into('cohorts');
};
  
const update = (id, changes) => {
    return db('cohorts')
        .where({id})
        .update(changes);
};
  
const remove = (id) => {
    return db('cohorts')
        .where({id})
        .del();
};

module.exports = {
    find, 
    findStudentsByCohort, 
    add, 
    update, 
    remove
};
