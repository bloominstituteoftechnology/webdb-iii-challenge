
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(tbl) {
  	tbl.increments();

  	tbl
  		.string('tag', 16)
  		.unique('tag')

  	tbl
  		.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('tags');
};
