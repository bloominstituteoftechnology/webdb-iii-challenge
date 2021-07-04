
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          userId: 4, 
          text: 'Sample Text',
        },
        {
          userId: 5, 
          text: 'Check check check',
        },
        {
          userId: 6, 
          text: 'Yippee',
        }
      ]);
    });
};
