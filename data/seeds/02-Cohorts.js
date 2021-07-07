
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'WEBPT1'},
        { name: 'WEBPT2'},
        { name: 'WEBPT3'}
      ]);
    });
};
