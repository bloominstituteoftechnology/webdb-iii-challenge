
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {student_name: 'student 1', cohort_name: 'CS1'},
        {student_name: 'student 2', cohort_name: 'CS2'},
        {student_name: 'student 3', cohort_name: 'CS3'},
        {student_name: 'student 4', cohort_name: 'CS3'},
        {student_name: 'student 5', cohort_name: 'CS2'},
        {student_name: 'student 6', cohort_name: 'CS3'},
        {student_name: 'student 7', cohort_name: 'CS1'},
        {student_name: 'student 8', cohort_name: 'CS1'}
      ]);
    });
};
