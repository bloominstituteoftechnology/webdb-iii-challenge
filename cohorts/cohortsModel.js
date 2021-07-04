const knex = require('knex');

const knexConfig = require('../knexfile');

const cohorts = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
  };
  
  function find() {
    return cohorts('cohorts');
  }
  
  function findById(id) {
    return cohorts('cohorts')
      .where({ id })
      .first();
  }
  
  function add(cohort) {
    return cohorts('cohorts')
      .insert(cohort)
      .into('cohorts');
  }
  
  function update(id, changes) {
    return cohorts('cohorts')
      .where({ id })
      .update(cohorts);
  }
  
  function remove(id) {
    return cohorts('cohorts')
      .where({ id })
      .del();
  }