
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate() // truncate resets the id so it stops incrementing
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'webpt2_eddy'},
        {id: 2, name: 'webpt2'},
        {id: 3, name: 'cspt8'}
      ]);
    });
};
