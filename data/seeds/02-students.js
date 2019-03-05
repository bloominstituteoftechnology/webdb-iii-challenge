
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Steve',cohort_id: 3},
        {name: 'Katie', cohort_id: 2},
        {name: 'Anne', cohort_id: 1}
      ]);
    });
};
