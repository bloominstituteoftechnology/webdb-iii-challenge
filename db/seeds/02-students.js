
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Coach McGuirk', cohort_id: 1},
        {name: 'Sterling Archer', cohort_id: 2},
        {name: 'Benjamin Katz', cohort_id: 3},
        {name: 'Jonathan Katz', cohort_id: 3}
      ]);
        });
};
