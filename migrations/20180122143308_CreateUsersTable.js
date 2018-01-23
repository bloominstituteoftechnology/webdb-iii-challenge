
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
      //need id auto increments primary key
      //need name required <=128 chars
      //need timestamp => now
      tbl.increments('id');
      tbl.string('name', 128).notNullable();
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
