
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Abi Franklin', cohort_id: 1},
        {name: 'Ryan Matthews', cohort_id: 1}
      ]);
    });
};
