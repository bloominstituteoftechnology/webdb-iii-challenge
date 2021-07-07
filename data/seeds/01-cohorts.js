exports.seed = function(knex, Promise) {
	return knex('cohorts')
		// Deletes ALL existing entries
		.truncate()
		// Inserts seed entries
		.then(function () {
			return knex('cohorts')
				.insert([
					{ name: 'CS-12' },
					{ name: 'CS-13' },
					{ name: 'CS-14' },
				]);
	});
};
