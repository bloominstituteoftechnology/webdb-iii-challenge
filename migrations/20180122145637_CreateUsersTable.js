
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
     tbl.increments('id').primary();

     tbl
     .string('name', 128)
     .notNullable()

     tbl.timestamp('created_at').default(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {

return knex.schema.dropTableIfExists('users');
};
