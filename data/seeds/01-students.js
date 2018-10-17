
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Ice Cube', cohort_id: 2},
        {name: 'Eazy-E', cohort_id: 2},
        {name: 'DJ Yela', cohort_id: 3}
      ]);
    });
};
