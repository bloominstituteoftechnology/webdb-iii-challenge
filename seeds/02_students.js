
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {student_id: 1, name: 'Bartamus Squeak', cohort_id: 1},
        {student_id: 2, name: 'Tin Pan', cohort_id: 2},
        {student_id: 3, name: 'Heferbleburt Dumois', cohort_id: 3}
      ]);
    });
};
