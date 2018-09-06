
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { studentName: 'John', 'cohort_id': 4 },
        { studentName: 'Javob', 'cohort_id': 5 },
        { studentName: 'Mary', 'cohort_id': 6 }
      ]);
    });
};
