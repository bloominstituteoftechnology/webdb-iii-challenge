
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {Id: 1, name: 'James', cohort_id: 1},
        {Id: 2, name: 'Mike', cohort_id: 2},
        {Id: 3, name: 'Walter', cohort_id: 3}
      ]);
    });
};
