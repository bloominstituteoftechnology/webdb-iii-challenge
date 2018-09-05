
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function (table) {
    // primary key id
    table.increments()
    // name text required
    table.string('name', 255)
         .notNullable()
         .unique('name')
         .defaultTo('not provided')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts')
};
