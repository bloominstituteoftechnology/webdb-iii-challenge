
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'fred', cohort_id: 1},
        {name: 'sam', cohort_id: 1},
        {name: 'jess', cohort_id: 1},
        {name: 'carl', cohort_id: 2},
        {name: 'tim', cohort_id: 2},
        {name: 'levis', cohort_id: 3},
        {name: 'paul', cohort_id: 3},
        {name: 'hubert', cohort_id: 3},
        {name: 'tom', cohort_id: 3},
        {name: 'author', cohort_id: 3},
        {name: 'levi', cohort_id: 3}
      ]);
    });
};
