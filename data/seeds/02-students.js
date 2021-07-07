
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Bob, from CS11', cohorts_id: 11},
        {name: 'Drew, from CS12', cohorts_id: 12},
        {name: 'Jon, from CS13', cohorts_id: 13}
      ]);
    });
};
