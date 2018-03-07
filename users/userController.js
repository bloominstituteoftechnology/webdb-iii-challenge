const knex = require('../database/dbConfig');

const user_db = {
    addUser: function (user) {
        return knex.insert(user).into('users');
    }
}

module.exports = user_db;