
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {cohort_id: 1, name: 'Value1'},
        {cohort_id: 2, name: 'Value2'},
        {cohort_id: 1, name: 'Value3'}
      ]);
    });
};
