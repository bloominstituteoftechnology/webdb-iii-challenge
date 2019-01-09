
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSWPT1'},
        {name: 'FSWPT2'},
        {name: 'FSWPT3'}
      ]);
    });
};
