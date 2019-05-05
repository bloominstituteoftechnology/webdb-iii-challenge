
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'FSW13'},
        { name: 'FSWPT2'},
        { name: 'FSW14'}
      ]);
    });
};
