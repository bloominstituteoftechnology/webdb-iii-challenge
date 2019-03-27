exports.up = function(knex) {
	return knex.schema.createTable('students', table => {
		table.increments();
		table.string('name').notNullable();
		table
			.integer('cohort_id')
			.notNullable()
			.references('id')
			.inTable('cohorts')
			.onDelete('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.chema.dropTableIfExists('students');
};
