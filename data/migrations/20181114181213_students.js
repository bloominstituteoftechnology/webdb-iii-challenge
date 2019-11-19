
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.integer('cohortId')
        table.foreign('cohortId').references('cohorts.id')
        table.timestamps(true,true);
      })  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
