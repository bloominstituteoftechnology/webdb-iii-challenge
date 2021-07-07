
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
      tbl.increments();
      tbl
        .string('name')
        .notNullable()
        .defaultTo('not provided');
        
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cohorts');
};
