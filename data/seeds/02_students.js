exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Lauren', cohort: 1 },
        { name: 'Liz', cohort: 2 },
        { name: 'Trevor', cohort: 3 },
        { name: 'Ashwin', cohort: 1 },
        { name: 'Luis', cohort: 1 },
        { name: 'Nathan', cohort: 2 },
        { name: 'Hagrid', cohort: 3 },
        { name: 'Hermoine', cohort: 3 },
        { name: 'Harry', cohort: 1 },
        { name: 'Ron', cohort: 2 },
        { name: 'Hedwig', cohort: 2 },
      ]);
    });
};
