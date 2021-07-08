exports.seed = function(knex, Promise) {
	const students = [
		{
			name: 'Bob Saget',
			cohort_id: 1
		},
		{
			name: 'John Stamos',
			cohort_id: 2
		},
		{
			name: 'Dave Coulier',
			cohort_id: 3
		}
	];

	return knex('students')
		.del()
		.then(function() {
			return knex('students').insert(students);
		});
};
