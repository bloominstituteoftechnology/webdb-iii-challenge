exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { id: 1, name: "jb miranda 1", cohort_id: 1 },
        { id: 2, name: "jb miranda 2", cohort_id: 2 },
        { id: 3, name: "jb miranda 2", cohort_id: 3 },
        { id: 4, name: "jb miranda 2", cohort_id: 4 },
        { id: 5, name: "jb miranda 2", cohort_id: 5 },
        { id: 6, name: "jb miranda 2", cohort_id: 6 },
        { id: 7, name: "jb miranda 2", cohort_id: 7 },
        { id: 8, name: "jb miranda 2", cohort_id: 8 },
        { id: 9, name: "jb miranda 2", cohort_id: 9 },
        { id: 10, name: "jb miranda 2", cohort_id: 10 },
        { id: 11, name: "jb miranda 2", cohort_id: 11 },
        { id: 12, name: "jb miranda 2", cohort_id: 12 },
        { id: 13, name: "jb miranda 2", cohort_id: 13 },
        { id: 14, name: "jb miranda 2", cohort_id: 14 },
        { id: 15, name: "jb miranda 2", cohort_id: 15 },
        { id: 16, name: "jb miranda 2", cohort_id: 16 },
        { id: 17, name: "jb miranda 2", cohort_id: 2 },
        { id: 18, name: "jb miranda 2", cohort_id: 2 },
        { id: 19, name: "jb miranda 2", cohort_id: 2 },
        { id: 20, name: "jb miranda 3", cohort_id: 3 }
      ]);
    });
};
// - `id`: primary key, auto-increments.
// - `name`: text, required.
// - `cohort_id`: references the `id` in the cohorts table.
