
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {
          id: 1, 
          tag: 'Tag1',
          created_at: 'Time'
        },
        {
          id: 2, 
          tag: 'Tag2',
          created_at: 'Time'
        },
        {
          id: 3, 
          tag: 'Tag3',
          created_at: 'Time'
        }
      ]);
    });
};
