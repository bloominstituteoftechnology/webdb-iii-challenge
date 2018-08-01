const db = require('../db');
const mappers = require('../helpers/mappers');

module.exports = {
    get: function(id) {
        let query = db('tags as t');

        if (id) {
            return query
              .where('id', id)
              .first()
              .then(tag => mappers.tagToBody(tag));
        }

        return query.then(tags => {
            return tags.map(tag => mappers.tagToBody(tag));
        });
    },
    insert: function(tag) {
        return db('tags')
        .insert(tag)
        .then(([id]) => this.get(id));
    },
    update: function() {
        
    },
    remove: function() {
        
    },
};
