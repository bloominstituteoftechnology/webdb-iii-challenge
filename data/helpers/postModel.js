const db = require('../db');
const mappers = require('../helpers/mappers');

module.exports = {
    get: function(id) {
        let query = db('posts as p');

        if (id) {
            return query
              .where('id', id)
              .first()
              .then(post => mappers.postToBody(post));
        }

        return query.then(posts => {
            return posts.map(post => mappers.postToBody(post));
        });
    },
    insert: function(post) {
        return db('posts')
        .insert(post)
        .then(([id]) => this.get(id));
    },
    update: function(id, changes) {
        return db('posts')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? this.get(id) : null));
    },
    remove: function(id) {
        return db('posts')
        .where('id', id)
        .del();
    },
};
