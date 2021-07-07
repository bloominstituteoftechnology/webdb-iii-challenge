
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'CS1'},
        {name: 'CS2'},
        {name: 'CS3'},
        {name: 'CS4'},
        {name: 'CS5'},
        {name: 'CS6'}
      ]);
    });
};
