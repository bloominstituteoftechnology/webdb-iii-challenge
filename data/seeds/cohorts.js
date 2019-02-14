
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate() // truncate resets the id so it stops incrementing
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, colName: 'webpt2_eddy'},
        {id: 2, colName: 'webpt2'},
        {id: 3, colName: 'cspt8'}
      ]);
    });
};
