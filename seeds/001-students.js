exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('students').truncate().then(function() {
		// Inserts seed entries
		return knex('students').insert([
			{ id: 1, name: 'Justin', cohort_id: 1 },
			{ id: 2, name: 'Christine', cohort_id: 2 },
			{ id: 3, name: 'Malik', cohort_id: 3 },
			{ id: 4, name: 'Billy', cohort_id: 1 },
			{ id: 5, name: 'Jacob', cohort_id: 2 },
			{ id: 6, name: 'Rane', cohort_id: 3 },
			{ id: 7, name: 'Jordan', cohort_id: 1 },
			{ id: 8, name: 'Dustin', cohort_id: 2 },
			{ id: 9, name: 'Cameron', cohort_id: 3 },
			{ id: 10, name: 'Phillip', cohort_id: 1 },
			{ id: 11, name: 'Austin', cohort_id: 2 },
			{ id: 12, name: 'Kevin', cohort_id: 3 },
			{ id: 13, name: 'Jamal', cohort_id: 1 },
			{ id: 14, name: 'Sanjay', cohort_id: 2 },
			{ id: 15, name: 'Mack', cohort_id: 3 }
		]);
	});
};
