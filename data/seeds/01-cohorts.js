
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSW12'},
        {name: 'iOS1'},
        {name: 'DS2'}
      ]);
    });
};
