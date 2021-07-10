const knex = require('../database/db');

const userDb = {
	getAll: function() {
		return knex('users');
	},
	addUser: function(user) {
		return knex.insert(user).into('users')
	},
	getById: function(id) {
		return knex('users').where({ id });
	},
	destroy: function(id) {
		return knex('users').where({ id }).del();
	},
	update: function(id, user) {
		return knex('users').where({ id }).update(user)
	}
}

module.exports = userDb;
