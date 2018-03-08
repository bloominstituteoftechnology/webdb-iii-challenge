exports.seed = function(knex, Promise) {
  return knex('posts').del()
    .then(function () {
      return knex('posts').insert([
        {id: 1, userid: 1, text: 'Buy Tesla!'},
        {id: 2, userid: 2, text: 'Learn linux'},
        {id: 3, userid: 3, text: 'E = MC^2'},
        {id: 4, userid: 4, text: 'Learn Python!'}
      ]);
    });
};
