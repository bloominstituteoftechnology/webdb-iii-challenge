exports.seed = function(knex, Promise) {
  return knex('posts').del()
    .then(function () {
      return knex('posts').insert([
        {postId: 1, userid: 1, text: '42'},
        {postId: 2, userid: 2, text: 'Iron Man'},
        {postId: 3, userid: 3, text: 'Baymax = Fluffy IronMan'},
        {postId: 4, userid: 4, text: 'Who am I?'}
      ]);
    });
};