
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Dan', cohort_id: 'cs10'},
        {id: 2, name: 'Seneca', cohort_id: 'cs10'},
        {id: 3, name: 'Plato', cohort_id: 'cs11'}
      ]);
    });
};
