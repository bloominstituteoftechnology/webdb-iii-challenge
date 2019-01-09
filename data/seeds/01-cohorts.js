
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSWPT2'},
        {name: 'FSW12'},
        {name: 'iOS3'}
      ]);
    });
};
