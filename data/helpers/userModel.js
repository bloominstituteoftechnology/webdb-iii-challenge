const db = require('../db');
const mappers = require('../helpers/mappers');

module.exports = {
    get: function(id) {
        let query = db('users as u');

        if(id) {
            query.where('u.id', id).first();

            const promises = [query, this.getUserPosts(id)];

            return Promise.all(promises).then(function(results) {
                let [user, posts] = results;
                user.posts = posts;

                return mappers.userToBody(user);
            });
        }

        return query.then(users => {
            return users.map(user => mappers.userToBody(user));
        });
    },
    getUserPosts: function(userId) {
        return db('posts')
        .where('userId', userId)
        .then(posts => posts.map(post => mappers.postToBody(post)));
    },
    insert: function(user) {
        return db('users')
        .insert(user)
        .then(([id]) => this.get(id));
    },
    update: function() {
        
    },
    remove: function() {
        
    },
};
