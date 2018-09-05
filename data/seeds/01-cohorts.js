
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSW12', id: 1},
        {name: 'iOS1', id: 2},
        {name: 'DS2', id:3}
      ]);
    });
};
