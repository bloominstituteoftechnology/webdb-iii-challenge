
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'Johnny Bravo'},
        {id: 2, name: 'Sindy Lou-Eho'},
        {id: 3, name: 'Rodger'}
      ]);
    });
};
