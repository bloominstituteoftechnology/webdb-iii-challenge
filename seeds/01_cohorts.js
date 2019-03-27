exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('cohorts')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('cohorts').insert([
				{ name: 'Web17' },
				{ name: 'Web18' },
				{ name: 'Web19' },
			]);
		});
};
