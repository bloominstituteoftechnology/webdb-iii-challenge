
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Sean', cohort_id:'WEBPT3'},
        {id: 2, name: 'John', cohort_id: 'WEBPT1'},
        {id: 3, name: 'Kon', cohort_id:'WEBPT2'}
      ]);
    });
};
