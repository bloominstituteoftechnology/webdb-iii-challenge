
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohort').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohort').insert([
        {name: 'CS Alpha'},
        {name: 'CS Beta'},
        {name: 'CD Theta'},
      ]);
    });
};
