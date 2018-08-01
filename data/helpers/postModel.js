const db = require('../db');
const mappers = require('../helpers/mappers');

module.exports = {
    get: function() {
        let query = db('posts as p');

        return query.then(posts => {
            return posts.map(post => mappers.postToBody(post));
        });
    },
    insert: function() {
        
    },
    update: function() {
        
    },
    remove: function() {
        
    },
};
