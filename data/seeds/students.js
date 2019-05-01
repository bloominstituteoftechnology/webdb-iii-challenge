
exports.seed = function(knex, Promise) {

	return knex('students')
		.truncate()
		.then(function() {
			
			return knex('students').insert([
				{ name: 'Kseniya', cohort_id: '1' },
				{ name: 'Alex', cohort_id: '1' },
				{ name: 'Andy', cohort_id: '2' }
			]);
		});
};