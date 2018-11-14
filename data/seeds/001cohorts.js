
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSW 14'},
        {name: 'FSWPT 4'},
        {name: 'DS 1'}
      ]);
    });
};
