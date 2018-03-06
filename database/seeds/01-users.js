
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Camila'},
        {id: 2, name: 'Clara'},
        {id: 3, name: 'Harry'}
      ]);
    });
};
