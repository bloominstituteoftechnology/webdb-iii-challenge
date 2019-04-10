
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
      
    tbl.increments();

    tbl
      .text('name')
      .notNullable()
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts')
};
