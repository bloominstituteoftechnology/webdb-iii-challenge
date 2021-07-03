
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohort', function(tbl) {
    tbl.increments('CohortID');
    tbl.string('name', 128)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohort');
};
