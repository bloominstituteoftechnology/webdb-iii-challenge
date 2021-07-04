
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Joseph', cohort_id: 1},
        {name: 'Trevor', cohort_id: 1},
        {name: 'Ashwin', cohort_id: 1},
        {name: 'Das', cohort_id: 2},
        {name: 'Grant', cohort_id: 2},
        {name: 'Francis', cohort_id: 2},
        {name: 'Katia', cohort_id: 3},
        {name: 'Carey', cohort_id: 3},
        {name: 'Naaz', cohort_id: 3},
      ]);
    });
};
