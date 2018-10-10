exports.up = function(knex, Promise) {
	return knex.schema.alterTable('cohorts', function(table) {
		table
			.unique('name');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.alterTable('cohorts', function(table) {
		table
			.dropUnique('name');
	});
};
