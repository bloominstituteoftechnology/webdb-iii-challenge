
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSW 1'},
        {name: 'FSW 2'},
        {name: 'FSW 3'}
      ]);
    });
};
