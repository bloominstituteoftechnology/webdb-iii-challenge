
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', table => {
    table.increments('cohort_id')
    table.string('name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
