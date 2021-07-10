
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Jason Bourne'},
        {id: 2, name: 'Salma Hayek'},
        {id: 3, name: 'Lebron James'}
      ]);
    });
};
