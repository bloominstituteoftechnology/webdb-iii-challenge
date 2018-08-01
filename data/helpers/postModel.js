const db = require('../db');
const mappers = require('../helpers/mappers');

module.exports = {
    get: function (id) {
        let query = db('posts as p');

        if (id) {
            query.where('p.id', id).first();

            const promises = [query, this.getPostTags(id)];

            return Promise.all(promises).then(function (results) {
                let [post, tags] = results;
                post.tags = tags;

                return mappers.postToBody(post);
            });
        }

        return query.then(posts => {
            return posts.map(post => mappers.postToBody(post));
        });
    },
    getPostTags: function (postId) {
        return db('tags')
            .where('postId', postId)
            .then(tags => tags.map(tag => mappers.tagToBody(tag)));
    },
    insert: function (post) {
        return db('posts')
            .insert(post)
            .then(([id]) => this.get(id));
    },
    update: function (id, changes) {
        return db('posts')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },
    remove: function (id) {
        return db('posts')
            .where('id', id)
            .del();
    },
};
