exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'Haywood' },
        { id: 2, name: 'Sam' },
        { id: 3, name: 'Luis' },
        { id: 4, name: 'Perry' },
      ]);
    });
};
