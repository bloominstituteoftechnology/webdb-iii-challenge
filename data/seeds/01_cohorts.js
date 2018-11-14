exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .truncate()
    .then(function() {
      return knex('cohorts').insert([
        { name: 'FSW13' },
        { name: 'FSW14' },
        { name: 'FSW15' }
      ])
    })
}
