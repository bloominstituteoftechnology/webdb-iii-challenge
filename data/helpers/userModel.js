const db = require('../db');
const mappers = require('../helpers/mappers');

module.exports = {
    get: function(id) {
        let query = db('users as u');

        if(id) {
            query.where('u.id', id).first();

            const promises = [query];

            return Promise.all(promises).then(function(results) {
                let [user] = results;

                return mappers.userToBody(user);
            });
        }

        return query.then(users => {
            return users.map(user => mappers.userToBody(user));
        });
    },
    insert: function() {
        
    },
    update: function() {
        
    },
    remove: function() {
        
    },
};
