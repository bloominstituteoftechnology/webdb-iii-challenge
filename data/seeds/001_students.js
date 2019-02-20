
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { id: 1, name: 'jb miranda 1', cohort_id: 1 },
        { id: 2, name: 'jb miranda 2', cohort_id: 2 },
        { id: 3, name: 'jb miranda 3', cohort_id: 3 }
      ]);
    });
};
// - `id`: primary key, auto-increments.
// - `name`: text, required.
// - `cohort_id`: references the `id` in the cohorts table.
