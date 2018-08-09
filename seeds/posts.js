exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([{ post: 'pink' }, { post: 'love' }, { post: 'ice cream' }]);
    });
};
