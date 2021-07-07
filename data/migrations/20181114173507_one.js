
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts',function(cohorts){
      cohorts.increments();
      cohorts.string('name', 255).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
