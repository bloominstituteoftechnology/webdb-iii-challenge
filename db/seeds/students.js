
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'James', cohort_id: 1},
        {name: 'Mike', cohort_id: 1},
        {name: 'Garett', cohort_id: 2}
      ]);
    });
};
