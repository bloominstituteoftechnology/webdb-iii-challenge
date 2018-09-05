exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Lauren', cohort_id: 1 },
        { name: 'Liz', cohort_id: 2 },
        { name: 'Trevor', cohort_id: 3 },
        { name: 'Ashwin', cohort_id: 1 },
        { name: 'Luis', cohort_id: 1 },
        { name: 'Nathan', cohort_id: 2 },
        { name: 'Hagrid', cohort_id: 3 },
        { name: 'Hermoine', cohort_id: 3 },
        { name: 'Harry', cohort_id: 2 },
        { name: 'Ron', cohort_id: 2 },
        { name: 'Hedwig', cohort_id: 1 },
      ]);
    });
};
