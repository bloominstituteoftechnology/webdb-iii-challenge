exports.seed = function (knex, Promise) {
  return knex('students')
    .del()
    .then(function () {
      return knex('students').insert([
        {
          name: 'Harold Pearald',
          cohort_id: '1',
          student_id: '1'
        },
        {
          name: 'Green Bean Jean',
          cohort_id: '2',
          student_id: '2'
        },
        {
          name: 'Tester Mc Testerman',
          cohort_id: '1',
          student_id: '3'
        }
      ]);
    });
};
