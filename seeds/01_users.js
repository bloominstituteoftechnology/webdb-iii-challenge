
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, 
          name: 'Brian',
          created_at: 'Time'
        },
        {
          id: 2, 
          name: 'Fritz',
          created_at: 'Time'
        },
        {
          id: 3, 
          name: 'Bowie',
          created_at: 'Time'
        }
      ]);
    });
};
