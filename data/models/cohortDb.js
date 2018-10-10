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
};
