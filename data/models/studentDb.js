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
	insert: function(newStudent) {
		let query = db('students as s');
		return query
			.insert(newStudent)
			.then(id => ({ id: id }));
	},
	update: function(id, updatedStudent) {
		let query = db('students as s');
		return query
			.select()
			.where('s.id', id)
			.update(updatedStudent);
	},
	delete: function(id) {
		let query = db('students as s');
		return query
			.where('s.id', id)
			.del();
	},
};
