
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Gannon', cohort_id: 1 },
        { name: 'Jeff', cohort_id: 2 },
        { name: 'Allen', cohort_id: 3 }
      ]);
    });
};
