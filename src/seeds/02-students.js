exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        {
          cohort_id: 1,
          name: 'John Smith',
        },
        {
          cohort_id: 1,
          name: 'Jane Doe',
        },
      ]);
    });
};
