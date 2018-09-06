
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Sergey', cohort_id: '13'},
        {name: 'SomeGuy', cohort_id: '14'},
        {name: 'David', cohort_id: '15'}
      ]);
    });
};
