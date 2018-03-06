
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, user_id: 1, text: 'Buy Tesla!'},
        {id: 2, user_id: 2, text: 'Learn linux'},
        {id: 3, user_id: 3, text: 'E = MC^2'},
        {id: 4, user_id: 4, text: 'Learn Python!'}
      ]);
    });
};
