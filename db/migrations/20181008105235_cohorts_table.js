
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
  	tbl.increments();
  	//defaultTo('default here)
  	tbl
  		.string('name', 128)
  		.notNullable()
  		.unique('name')
  })
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('cohorts');
};
