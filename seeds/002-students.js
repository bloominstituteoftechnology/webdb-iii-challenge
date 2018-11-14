
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'zach',cohort_id:'1'},
        {name: 'dave',cohort_id:'2'},
        {name: 'steve',cohort_id:'1'}
      ]);
    });
};
