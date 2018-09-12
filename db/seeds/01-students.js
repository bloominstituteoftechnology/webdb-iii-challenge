
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Luis', cohort_id: 1},
        {name: 'Andrew ', cohort_id: 2},
        {name: 'Ash', cohort_id: 3}
      ]);
    });
};
