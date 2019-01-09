
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'Phillip J Fry'},
        {id: 2, name: 'Yancy Fry'},
        {id: 3, name: 'Hubert J Farnzworth'}
      ]);
    });
};
