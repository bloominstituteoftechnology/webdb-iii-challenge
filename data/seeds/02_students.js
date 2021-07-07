exports.seed = function(knex, Promise) {
  return knex('students')
    .truncate()
    .then(function() {
      return knex('students').insert([
        { name: 'Student 1', cohort_id: '1' },
        { name: 'Student 2', cohort_id: '2' },
        { name: 'Student 3', cohort_id: '3' }
      ])
    })
}
