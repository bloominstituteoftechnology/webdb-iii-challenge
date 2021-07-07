exports.seed = function(knex, Promise) {
	return knex('students')
		// Inserts seed entries
		.then(function () {
			return knex('students')
				.insert([
					{ name: 'David', cohort_id: 3 },
					{ name: 'Ellen', cohort_id: 2 },
					{ name: 'Frank', cohort_id: 1 },
				]);
	});
};
