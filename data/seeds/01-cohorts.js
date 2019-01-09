
exports.seed = function (knex, Promise) {
  return knex('cohorts').truncate()
    .then(function () {
      return knex('cohorts').insert([
        { id: 1, name: 'Cohort 1' },
        { id: 2, name: 'Cohort 2' },
        { id: 3, name: 'Cohort 3' }
      ]);
    });
};
