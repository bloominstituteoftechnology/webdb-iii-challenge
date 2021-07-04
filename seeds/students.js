
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Ashwin', cohort_id: 1},
        { name: 'John', cohort_id: 2},
        { name: 'Jordan', cohort_id: 3},
      ]);
    });
};
