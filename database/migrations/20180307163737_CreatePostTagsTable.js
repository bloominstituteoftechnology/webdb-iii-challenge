
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_tags', function(tbl) {
  	tbl.increments();

  	tbl
  		.integer('tagId')
  		.unsigned()
  		.references('id')
  		.inTable('posts')

  	tbl
  		.integer('postId')
  		.unsigned()
  		.references('id')
  		.inTable('tags')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post_tags');
};
