
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'John', cohort_id: 2},
        {name: 'Mark', cohort_id: 1},
        {name: 'Michelle', cohort_id: 2},
        {name: 'Michael', cohort_id: 1},
        {name: 'Patrick', cohort_id: 4},
        {name: 'Bruno', cohort_id: 6}
      ]);
    });
};
