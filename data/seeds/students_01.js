
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Lee Lichtsinn', cohort_id: '2'},
        {id: 2, name: 'Troy Williams', cohort_id: '3'},
        {id: 3, name: 'Dane Zara', cohort_id: '1'},
        {id: 4, name: 'Roy Bennent', cohort_id: '1'},
        {id: 5, name: 'George Santos', cohort_id: '3'},
        {id: 6, name: 'Chris Telford', cohort_id: '3'}
      ]);
    });
};
