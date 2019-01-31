exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('students')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('students').insert([
				{ name: 'bob', cohort_id: '1' },
				{ name: 'sally', cohort_id: '1' },
				{ name: 'victor', cohort_id: '2' }
			]);
		});
};
