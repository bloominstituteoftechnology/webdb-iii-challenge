exports.up = function(knex, Promise) {
	return knex.schema.createTable('students', function(table) {
		table
			.increments();

		table
			.string('name', 255)
			.notNullable();

		table
			.integer('cohort_id')
			.unsigned() // cannot be negative
			.references('id')
			.inTable('cohorts');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('students');
};
