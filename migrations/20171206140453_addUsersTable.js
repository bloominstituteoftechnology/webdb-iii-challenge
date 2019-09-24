
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl){
      tbl.increments('id');
      tbl.string('name', 128).notNullable().unique('name', 'uq_name');
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
