const db = require('../dbConfig.js');

module.exports = {
	get: function(id) {
		let query = db('cohorts as c');
		if (id) {
			return query
				.select()
				.where('c.id', id);
		}
		return query;
	},
	getStudents: function(id) {
		let query = db('students as s');
		return query
			.select()
			.where('s.cohort_id', id);
	},
	insert: function(newCohort) {
		let query = db('cohorts as c');
		return query
			.insert(newCohort)
			.then(id => ({ id: id }));
	},
	update: function(id, updatedCohort) {
		let query = db('cohorts as c');
		return query
			.select()
			.where('c.id', id)
			.update(updatedCohort);
	},
	delete: function(id) {
		let query = db('cohorts as c');
		return query
			.where('c.id', id)
			.del();
	},
};
