exports.seed = function(knex, Promise) {
	return knex('students')
		// Deletes ALL existing entries
		.truncate()
		// Inserts seed entries
		.then(function () {
			return knex('students')
				.insert([
					{ name: 'Alan', cohort_id: 1 },
					{ name: 'Bob', cohort_id: 2 },
					{ name: 'Carol', cohort_id: 3 },
				]);
	});
};
