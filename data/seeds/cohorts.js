exports.seed = function(knex, Promise) {
	const cohorts = [{ name: 'cs13' }, { name: 'cs14' }, { name: 'cs15' }];

	return knex('cohorts')
		.del()
		.then(function() {
			return knex('cohorts').insert(cohorts);
		});
};
