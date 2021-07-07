
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Dennis Orbison', cohort_id: 0},
        {name: 'Ahn Rami', cohort_id: 0},
        {name: 'Doc Holiday', cohort_id: 1},
        {name: 'Ryu Suhui', cohort_id: 1},
        {name: 'John Doe', cohort_id: 2},
        {name: 'Leah Moore', cohort_id: 2},
        {name: 'John Doe Jr.', cohort_id: 3},
        {name: 'Bill Gates', cohort_id: 3}
      ]);
    });
};
