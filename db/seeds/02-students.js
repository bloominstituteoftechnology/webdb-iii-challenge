
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Bilbo Baggins', cohort_id: '1'},
        { name: 'Fred Berfle', cohort_id: '2'},
        { name: 'Thomas Waffle', cohort_id: '3'}
      ]);
    });
};
