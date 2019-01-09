
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohort').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohort').insert([
        {name: 'FSW1'},
        {name: 'FSW2'},
        {name: 'FSWPT1'}
      ]);
    });
};
