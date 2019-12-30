exports.seed = function(knex, Promise) {
  return knex('posts').del()
    .then(function () {
      return knex('posts').insert([
        {postId: 1, userid: 1, text: 'Buy Tesla!'},
        {postId: 2, userid: 2, text: 'Learn linux'},
        {postId: 3, userid: 3, text: 'E = MC^2'},
        {postId: 4, userid: 4, text: 'Learn Python!'}
      ]);
    });
};
