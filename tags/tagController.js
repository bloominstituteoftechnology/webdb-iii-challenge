const knex = require('../database/dbConfig');

const tag_db = {
    addTag: function (tag) {
        return knex.insert(tag).into('tags');
    },
    allTags: function () {
        return knex('tags');
    },
    getId: function (id) {
        return knex('tags').where({ id });
    },
    updateTag: function (id, tag) {
        return knex('tags').where({ id }).update(tag);
    },
    deleteTag: function(id) {
        return knex('tags').where({ id }).del();
    }
}

module.exports = tag_db;