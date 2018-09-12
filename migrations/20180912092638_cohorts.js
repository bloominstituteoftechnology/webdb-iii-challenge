
exports.up = function(knex, Promise) {
  // implement the change we want in db
  return knex.schema.createTable('cohorts'), function(tbl) {
      tbl.increments();

      tbl
      .string('name')
      .notNullable()
      .unique('name')
  }
};

exports.down = function(knex, Promise) {
  // we undo the change made to the db
  return knex.schema.dropTable('cohorts');
};
