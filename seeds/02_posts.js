
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          userId: 1, 
          text: 'Sample Text',
          created_at: 'Time'
        },
        {
          id: 2, 
          userId: 2, 
          text: 'Check check check',
          created_at: 'Time'        },
        {
          id: 3, 
          userId: 3, 
          text: 'Yippee',
          created_at: 'Time'        }
      ]);
    });
};
