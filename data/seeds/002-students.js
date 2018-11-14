exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('students').del().then(function() {
		// Inserts seed entries
		return knex('students').insert([
			{ cohort_id: 2, name: 'Carlos' },
			{ cohort_id: 2, name: 'Samuel' },
			{ cohort_id: 2, name: 'Sarah' },
			{ cohort_id: 2, name: 'Savannah' },
			{ cohort_id: 2, name: 'Chance' },
			{ cohort_id: 2, name: 'Rahul' },
			{ cohort_id: 2, name: 'Lajewanti' },
			{ cohort_id: 3, name: 'Eric' },
			{ cohort_id: 3, name: 'Paul' },
			{ cohort_id: 3, name: 'Andre' },
			{ cohort_id: 1, name: 'Tai' }
		]);
	});
};
