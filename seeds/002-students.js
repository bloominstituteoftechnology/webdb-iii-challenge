
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Anthony Venturini', cohorts_id: 2},
        {name: 'Frank Martinez', cohorts_id: 3},
        {name: 'Elan Riznis', cohorts_id: 1},
        {name: 'Jordan Stoddard', cohorts_id: 2},
        {name: 'Jawad Hussein', cohorts_id: 1}
      ]);
    });
};
