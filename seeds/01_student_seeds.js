
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Brian', cohort_id: 1},
        {name: 'Patrick', cohort_id: 1},
        {name: 'Bob 1', cohort_id: 2},
        {name: 'Brian 2', cohort_id: 2},
        {name: 'Patrick 3', cohort_id: 2},
        {name: 'Bob 1', cohort_id: 3},
        {name: 'Brian 2', cohort_id: 3},
        {name: 'Patrick 3', cohort_id: 3},
        {name: 'John', cohort_id: 1}
      ]);
    });
};
