const knex = require('knex');

const knexConfig = require('../../knexfile.js');
const db = knex(knexConfig.development);

const find = (id) => {
    if(id) {
        return db('students')
            .where({id})
            .first();
    } else {
        return db('students');
    }
};

const findWithCohort = (id) => {
    return db('students')
        .select('students.id', 'students.name', {cohort: 'cohorts.name'})
        .innerJoin('cohorts', 'students.cohort_id', 'cohorts.id')
        .where('students.cohort_id', id);
};

const add = (newStudent) => {
    return db('students')
        .insert(newStudent)
        .into('students');
};
  
const update = (id, changes) => {
    return db('students')
        .where({id})
        .update(changes);
};
  
const remove = (id) => {
    return db('students')
        .where({id})
        .del();
};

module.exports = {
    find, 
    findWithCohort, 
    add, 
    update, 
    remove
};
