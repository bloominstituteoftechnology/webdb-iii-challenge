
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Troy Amlee'},
        {cohort_id: 2, name: 'John Doe'},
        {cohort_id: 3, name: 'Karl Towns'},
        {cohort_id: 2, name: 'Jimmy Butler'},
        {cohort_id: 1, name: 'Jeff Teague'},
        {cohort_id: 2, name: 'Zion Williamson'},
        {cohort_id: 4, name: 'Derrick Rose'},
        {cohort_id: 2, name: 'Andrew Wiggins'},
        {cohort_id: 3, name: 'Tyus Jones'}
      ]);
    });
};
