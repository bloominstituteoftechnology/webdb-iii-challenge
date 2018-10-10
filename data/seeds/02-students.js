
exports.seed = function(knex, Promise) {
  return knex('students')
    .truncate()
    .then(function () {
      return knex('students').insert([
        {name: 'George Washington', cohort_id: 1},
        {name: 'James Polk', cohort_id: 1},
        {name: 'John Adams', cohort_id: 1},
        {name: 'Thomas Jefferson', cohort_id: 2},
        {name: 'Abraham Lincoln', cohort_id: 3},
      ]);
    });
};
