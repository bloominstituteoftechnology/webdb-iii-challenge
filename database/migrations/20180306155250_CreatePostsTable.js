
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(tbl) {
  	tbl.increments();

  	tbl
  		.integer('userId')
  		.unsigned()
  		.references('id')
  		.inTable('users');

  	tbl
  		.string('text')
  		.notNullable()

  	tbl
  		.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('posts');
};
