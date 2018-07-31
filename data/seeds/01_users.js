
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {id: 1, name: 'Iron Man'},
        {id: 2, name: 'Captain America'},
        {id: 3, name: 'Black Panther'}
      ]);
    });
};
