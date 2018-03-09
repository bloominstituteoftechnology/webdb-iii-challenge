exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('blogposts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('blogposts').insert([
        { id: 1, postId: 5, tag: '1' },
        { id: 2, postId: 5, tag: '2' },
        { id: 3, postId: 2 },
        { id: 4, postId: 6, tag: '3' },
      ]);
    });
};
