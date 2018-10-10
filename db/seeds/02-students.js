exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { student_name: "Elon", cohort_id: 1 },
        { student_name: "Bill", cohort_id: 1 },
        { student_name: "Warren", cohort_id: 1 },
        { student_name: "Steve", cohort_id: 2 }
      ]);
    });
};
