
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {student_name: 'Bubba', cohort_id: 13},
        {student_name: 'Joe', cohort_id: 13},
        {student_name: 'BananaLee', cohort_id: 13},
        {student_name: 'Captain', cohort_id: 13},
        {student_name: 'Jen', cohort_id: 14},
        {student_name: 'Wahoo', cohort_id: 14},
        {student_name: 'Princess', cohort_id: 14},
        {student_name: 'Melon', cohort_id: 14},
        {student_name: 'Im', cohort_id: 15},
        {student_name: 'Tired', cohort_id: 15},
        {student_name: 'Of', cohort_id: 15},
        {student_name: 'Naming', cohort_id: 15}
      ]);
    });
};
