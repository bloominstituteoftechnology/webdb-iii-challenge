
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {userId: 1, text: 'This is my post info 1'},
        {userId: 2, text: 'This is my post info 2'},
        {userId: 3, text: 'This is my post info 3'}
      ]);
    });
};
