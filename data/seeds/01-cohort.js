
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Group Lambda'},
        {name: 'Group Lambda2'},
        {name: 'Group Lambda3'}
      ]);
    });
};
