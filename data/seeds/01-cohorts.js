
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'Full Stack Web PT2'},
        {id: 2, name: 'IOS 1'},
        {id: 3, name: 'Alumni PD'}
      ]);
    });
};
