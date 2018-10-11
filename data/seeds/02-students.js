
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Thanos', cohort_id: 1},
        { name: 'Spiderman', cohort_id: 1 },
        { name: 'Hulk', cohort_id: 1 }
      ]);
    });
};
