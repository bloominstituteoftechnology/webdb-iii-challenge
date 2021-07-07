
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'FSW1'},
        {id: 2, name: 'FSWPT2'},
        {id: 3, name: 'FSWPT3'}
      ]);
    });
};
