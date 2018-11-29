
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students_table').del()
    .then(function () {
      // Inserts seed entries
      return knex('students_table').insert([
        {cohort_id: 3, name: 'Margo'},
        {cohort_id: 3, name: 'Wanda'},
        {cohort_id: 8, name: 'Will'}
      ]);
    });
};
