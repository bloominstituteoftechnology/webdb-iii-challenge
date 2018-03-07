const knex = require('../database/dbConfig');

const user_db = {
    getAll: function() {
        return knex('users');
    }, 
    getID: function(id) {
        return knex('users').where({ id });
    },
    addUser: function(user) {
        return knex.insert(user).into('users');
    },
    updateUser: function(id, zoo) {
        return knex('users').where({ id }).update(user);
    },
    eraseUser: function(id) {
        return knex('users').where({ id }).del();
    }, 
    getPostByID: function(UserId) {
        return knex('posts').where('userId', id);
    }
}

module.exports = user_db;