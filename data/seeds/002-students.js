
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Frank', cohortId: '1'},
        {name: 'Jim', cohortId: '2'},
        {name: 'Jack', cohortId: '3'}
      ]);
    });
};
