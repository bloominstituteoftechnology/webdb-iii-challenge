
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, cohort_id: 3, name: 'Jibraltus Camden'},
        {id: 2, cohort_id: 1, name: 'Sylius Achtmun'},
        {id: 3, cohort_id: 3, name: 'Tsion Aderes'}
      ]);
    });
};
