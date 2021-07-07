exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Chris', cohort_id: 1 },
        { name: 'Julie', cohort_id: 3 },
        { name: 'Griffin', cohort_id: 2 },
        { name: 'Megan', cohort_id: 1 },
        { name: 'Jess', cohort_id: 3 },
        { name: 'Humberto', cohort_id: 3 },
        { name: 'Tommy', cohort_id: 1 },
        { name: 'Michael', cohort_id: 4 },
        { name: 'Katia', cohort_id: 5 },
        { name: 'Jacob', cohort_id: 2 },
        { name: 'Russell', cohort_id: 3 },
        { name: 'Diandra', cohort_id: 5 }
      ]);
    });
};
