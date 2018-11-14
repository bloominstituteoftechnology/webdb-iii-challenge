exports.seed = function (knex, Promise) {
  return knex('students').del()
    .then(function () {
      return knex('students').insert([
        { cohort_id: 1, name: 'Pedro Montesinos' },
        { cohort_id: 1, name: 'Philip DeFranco' },
        { cohort_id: 2, name: 'RiceGum' },
        { cohort_id: 2, name: 'Keemstar' },
        { cohort_id: 3, name: 'Keemstar' },
        { cohort_id: 3, name: 'Lily Singh' },
        { cohort_id: 4, name: 'Drake' },
        { cohort_id: 4, name: 'Tekashi' },
        { cohort_id: 5, name: 'Kanye West' },
        { cohort_id: 5, name: 'Kim Kardashian' }
      ]);
    });
};