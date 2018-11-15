exports.seed = function(knex, Promise) {
  return knex('students')
    .truncate()
    .then(function() {
      return knex('students').insert([{ name: 'Samuel Ko', cohort_id: '2' }]);
    });
};
