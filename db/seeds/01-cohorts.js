
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'CS 1'},
        {name: 'CS 2'},
        {name: 'CS 3'},
        {name: 'CS 4'},
        {name: 'CS 5'},
        {name: 'CS 6'},
      ]);
    });
};
