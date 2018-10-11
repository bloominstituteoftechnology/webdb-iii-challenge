
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Brock', cohort_id: 3},
        { name: 'Lauren', cohort_id: 3},
        { name: 'Casey', cohort_id: 3}
      ]);
    });
};
