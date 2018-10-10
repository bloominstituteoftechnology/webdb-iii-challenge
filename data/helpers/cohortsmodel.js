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

const add = (cohort) => {
    return db('cohorts')
        .insert(cohort)
        .into('cohorts');
}
  
const update = (id, changes) => {
    return db('cohorts')
        .where({id})
        .update(changes);
}
  
const remove = (id) => {
    return db('cohorts')
        .where({id})
        .del();
}

module.exports = {
    find, 
    add, 
    update, 
    remove
};
