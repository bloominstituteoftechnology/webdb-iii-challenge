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

const add = (student) => {
    return db('students')
        .insert(student)
        .into('students');
}
  
const update = (id, changes) => {
    return db('students')
        .where({id})
        .update(changes);
}
  
const remove = (id) => {
    return db('students')
        .where({id})
        .del();
}

module.exports = {
    find, 
    add, 
    update, 
    remove
};
