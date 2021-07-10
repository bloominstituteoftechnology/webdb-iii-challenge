const knex = require('../database/db');

const tagDb = {
	getAll: function() {
		return knex('tags');
	},
	addtag: function(tag) {
		return knex.insert(tag).into('tags')
	},
	getById: function(id) {
		return knex('tags').where({ id });
	},
	destroy: function(id) {
		return knex('tags').where({ id }).del();
	},
	update: function(id, tag) {
		return knex('tags').where({ id }).update(tag)
	}
}

module.exports = tagDb;
