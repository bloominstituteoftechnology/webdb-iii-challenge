
exports.up = function(knex, Promise) {
 return knex.schema.createTable('users', function(tbl) {
    tbl.increments(); // called id by default
	tbl.string('name', 128).notNullable();
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
 });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
