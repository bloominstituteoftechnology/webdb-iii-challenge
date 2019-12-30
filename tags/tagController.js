const knex = require('../database/dbConfig');

const tag_db = {
    addTag: function (tag) {
        return knex.insert(tag).into('tags');
    },
    allTags: function () {
        return knex('tags');
    },
    getId: function (tagId) {
        return knex('tags').where({ tagId });
    },
    updateTag: function (tagId, tag) {
        return knex('tags').where({ tagId }).update(tag);
    },
    deleteTag: function(tagId) {
        return knex('tags').where({ tagId }).del();
    }
}

module.exports = tag_db;