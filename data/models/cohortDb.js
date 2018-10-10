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
	insert: function(newCohort) {
		let query = db('cohorts as c');
		return query
			.select()
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
};
