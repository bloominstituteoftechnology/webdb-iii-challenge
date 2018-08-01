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
    update: function() {
        
    },
    remove: function() {
        
    },
};
