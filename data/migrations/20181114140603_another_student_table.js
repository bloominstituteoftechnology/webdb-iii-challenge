
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', table => {
    table.integer('cohort_id')
    table.increments('id')
    table.string('name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
