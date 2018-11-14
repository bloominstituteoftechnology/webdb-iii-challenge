
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {cohort_id: 1, name: 'The Mighty Ones'},
        {cohort_id: 2, name: 'The Triumphant Twos'},
        {cohort_id: 3, name: 'The Thrifty Threes'}
      ]);
    });
};
