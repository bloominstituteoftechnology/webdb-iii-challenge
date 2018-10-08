exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
  	tbl.increments();
  	//defaultTo('default here)
  	tbl
  		.string('name', 128)
  		.notNullable()

  	tbl
  		.integer('cohort_id')
  		.unsigned()
  		.notNullable()
  		.references('id')
  		.inTable('cohorts')
  })
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('students');
};
