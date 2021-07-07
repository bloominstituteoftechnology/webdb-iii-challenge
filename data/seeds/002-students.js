
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { cohort_id: 1,student_name: 'student1' }, // 1
        {cohort_id: 1, student_name: 'student2' }, // 2
        {cohort_id: 3, student_name: 'student3' }, // 3
        { cohort_id: 3,student_name: 'student4' }, // 4
        { cohort_id: 2,student_name: 'student5' }, // 1
        {cohort_id: 2, student_name: 'student6' }, // 2
        {cohort_id: 4, student_name: 'student7' }, // 3
        { cohort_id: 4,student_name: 'student8' }, // 4
      ]);
    });
};
