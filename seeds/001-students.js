exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('students').truncate().then(function() {
		// Inserts seed entries
		return knex('students').insert([
			{ id: 1, name: 'Justin', cohort: 'WebPt4' },
			{ id: 2, name: 'Christine', cohort: 'Web19' },
			{ id: 3, name: 'Malik', cohort: 'Web19' },
			{ id: 4, name: 'Billy', cohort: 'WebPt4' },
			{ id: 5, name: 'Jacob', cohort: 'Web19' },
			{ id: 6, name: 'Rane', cohort: 'iOS4' },
			{ id: 7, name: 'Jordan', cohort: 'WebPt4' },
			{ id: 8, name: 'Dustin', cohort: 'Web19' },
			{ id: 9, name: 'Cameron', cohort: 'iOS4' },
			{ id: 10, name: 'Phillip', cohort: 'WebPt4' },
			{ id: 11, name: 'Austin', cohort: 'Web19' },
			{ id: 12, name: 'Kevin', cohort: 'Web19' },
			{ id: 13, name: 'Jamal', cohort: 'WebPt4' },
			{ id: 14, name: 'Sanjay', cohort: 'Web19' },
			{ id: 15, name: 'Mack', cohort: 'Web19' }
		]);
	});
};
