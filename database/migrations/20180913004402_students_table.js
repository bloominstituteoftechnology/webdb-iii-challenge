
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
     tbl.increments();
     tbl
        .string('name')
        .notNullable()
        .defaultTo('not provided')
        .integer('cohort_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students');
};
