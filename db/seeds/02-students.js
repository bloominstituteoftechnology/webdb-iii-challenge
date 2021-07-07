
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'peter', cohort_id: '1'},
        {name: 'jack', cohort_id: '1'},
        {name: 'mary', cohort_id: '2'},
        {name: 'pat', cohort_id: '2'},
        {name: 'mack', cohort_id: '3'},
        {name: 'sue', cohort_id: '3'},
      ]);
    });
};

