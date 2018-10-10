const knex = require('knex');

const knexConfig = require('../knexfile.js');

const lambda = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    add
};

function find(){
    return lambda('cohorts');
}

function findById(id){
    return lambda('cohorts')
        .where({id})
}

function add(cohort){
    return lambda('cohorts')
        .insert(cohort)
        .into('cohorts');
}