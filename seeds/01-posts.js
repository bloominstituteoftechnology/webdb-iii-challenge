
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(() => {
      // Inserts seed entries
      return knex('posts').insert([
        {user_id: 2, text: 'I am the law!'},
        {user_id: 2, text: 'Get Busy Living or Get Busy Dying'},
        {user_id: 3, text: `I ain't got time to bleed`},
        {user_id: 4, text: `Game over man! Game over!`},
        {user_id: 4, text: 'You are tearing me apart Lisa!'}
      ]);
    });
};
