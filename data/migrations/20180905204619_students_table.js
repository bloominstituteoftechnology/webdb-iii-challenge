
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
      tbl.increments();

      tbl
        .string('name',128)
        .notNullable();

        tbl.integer('cohort_id')
        .unsigned()
        .notNullable()
        .references('id')
        .intable('cohorts');
  })
};

exports.down = function(knex, Promise) {
  
};
