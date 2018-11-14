
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'FSW-1020'},
        {id: 2, name: 'RDBMS-527'},
        {id: 3, name: 'AR-497'}
      ]);
    });
};
