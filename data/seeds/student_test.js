exports.seed = function(knex, Promise) {
  return knex('students')
    .truncate()
    .then(function () {
      return knex('students').insert([
        { name: 'Chris Reilly', cohort_id: 3 },
        { name: 'Joe Fakename', cohort_id: 3 },
      ]);
    });
};
