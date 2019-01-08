
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Emmanuel', cohort_id: '11'},
        {name: 'Anon', cohort_id: '12'},
        {name: 'Craig', cohort_id: '13'}
      ]);
    });
};
