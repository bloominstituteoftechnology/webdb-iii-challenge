exports.seed = function(knex, Promise) {
  return knex('posts').del()
    .then(function () {
      return knex('posts').insert([
        {postId: 1, user_id: 1, text: '42'},
        {postId: 2, user_id: 2, text: 'Iron Man'},
        {postId: 3, user_id: 3, text: 'Baymax = Fluffy IronMan'},
        {postId: 4, user_id: 4, text: 'Who am I?'}
      ]);
    });
};