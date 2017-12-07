
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userName: 'user1'},
        {userName: 'user2'},
        {userName: 'user3'}
      ]);
    });
};
