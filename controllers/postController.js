const knex = require('../database/db');

const postDb = {
	getAll: function() {
		return knex('posts');
	},
	addpost: function(post) {
		return knex.insert(post).into('posts')
	},
	getById: function(id) {
		return knex('posts').where({ id });
	},
	destroy: function(id) {
		return knex('posts').where({ id }).del();
	},
	update: function(id, post) {
		return knex('posts').where({ id }).update(post)
	}
}

module.exports = postDb;
