
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl){
      tbl.increments();
      tbl.string('name', 50).notNullable();
      tbl   
        .integer('cohort_id')
        .unsigned()
        .references('id')
        .inTable('cohorts');
  });
};;

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
