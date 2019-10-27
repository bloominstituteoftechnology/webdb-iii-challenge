
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('student').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('student').insert([
        { name: 'Javier', cohort_id: 1},
        { name: 'John', cohort_id: 1 },
        { name: 'Marcus', cohort_id: 1},
      ]);
    });
};
