
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Erin'},
        {id: 2, name: 'Mike'},
        {id: 3, name: 'Ryan'},
        {id: 4, name: 'Melissa'}
      ]);
    });
};
