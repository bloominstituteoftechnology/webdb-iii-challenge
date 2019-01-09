
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'webpt1'},
        {name: 'webpt2'},
        {name: 'webpt3'}
      ]);
    });
};
