
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Joram Clervius'},
        {cohort_id: 2, name: 'Tai Le'},
        {cohort_id: 3, name: 'Rahul Desai'},
        {cohort_id: 3, name: 'Samuel Machat'},
        {cohort_id: 3, name: 'Chance Embrey-Farquhar'}
      ]);
    });
};