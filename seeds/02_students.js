exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('students')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('students').insert([
				{ name: 'Kevin', cohort_id: 1 },
				{ name: 'Dylan', cohort_id: 1 },
				{ name: 'Jay', cohort_id: 2 },
			]);
		});
};
