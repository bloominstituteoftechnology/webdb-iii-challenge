
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {count: 75, name: 'webpt2'},
        {count: 100, name: 'webpt3'},
        {count: 125, name: 'webpt4'}
      ]);
    });
};
