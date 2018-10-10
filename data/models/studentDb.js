const db = require('../dbConfig.js');

module.exports = {
	get: function(id) {
		let query = db('students as s')
		if (id) {
			return query
				.select()
				.where('s.id', id);
		}
		return query;
	},
};
