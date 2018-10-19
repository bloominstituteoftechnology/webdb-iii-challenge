
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Linda', cohort_id: 1},
        {name: 'Wonjae', cohort_id: 1},
        {name: 'Emily', cohort_id: 2}
      ]);
    });
};
