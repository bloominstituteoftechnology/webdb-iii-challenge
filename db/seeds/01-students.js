
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Adam', cohort_id: 7},
        {name: 'Jordan', cohort_id: 8},
        {name: 'Rachel', cohort_id: 9},
        {name: 'John', cohort_id: 7}
      ]);
    });
};
