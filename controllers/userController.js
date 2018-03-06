const knex = require('../database/db');

const userDb = {
	getAll: function() {
		return knex('users');
	},
	addUser: function(user) {
		return knex.insert(user).into('users')
	}
}

module.exports = userDb;
