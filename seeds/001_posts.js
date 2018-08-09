
exports.seed = function(knex, Promise) {
    return knex('posts').del()
    .then(function () {
        return knex('posts').isert([
            {post: 'postage'},
            {post: 'post haste'},
            {post: 'post partum'},
            {post: 'postal'}
        ]);
    });
};