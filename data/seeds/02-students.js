
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Bryce Evans', cohort_id: 1},
        {id: 2, name: 'Fillmore', cohort_id: 2},
        {id: 3, name: 'Stanley', cohort_id: 3},
        {id: 4, name: 'Sally', cohort_id: 1},
        {id: 5, name: 'Ramone', cohort_id: 2},
        {id: 6, name: 'Flow', cohort_id: 3},
        {id: 7, name: 'Lightning', cohort_id: 1},
        {id: 8, name: 'Mater', cohort_id: 1},
        {id: 9, name: 'Hud', cohort_id: 1}
      ]);
    });
};
