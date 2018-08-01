const db = require('../db');
const mappers = require('../helpers/mappers');

module.exports = {
    get: function(id) {
        let query = db('tags as t');

        return query.then(tags => {
            return tags.map(tag => mappers.tagToBody(tag));
        });
    },
    insert: function() {
        
    },
    update: function() {
        
    },
    remove: function() {
        
    },
};
