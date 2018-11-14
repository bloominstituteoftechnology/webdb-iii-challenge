
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { cohort_id: 1, name: 'kam'},
        { cohort_id: 2, name: 'yanrong'},
        { cohort_id: 3, name: 'katie'},
        { cohort_id: 4, name: 'shaw'},
      ]);
    });
};
