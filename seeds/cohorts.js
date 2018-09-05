
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'CS12'},
        {name: 'SuperCows'},
        {name: 'Banana'}
      ]);
    });
};
