exports.up = function(knex) {
	return knex.schema.createTable('cohorts', table => {
		table.increments();
		table.string('name').notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('cohorts');
};
