
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {userID: 1, text: 'This is a post'},
        {userID: 1, text: 'This is another post'},
        {userID: 1, text: 'Even more posts'}
      ]);
    });
};
