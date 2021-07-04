
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'iOS1', id: 1},
        {name: 'ML2', id: 2},
        {name: 'FSW12', id: 3}
      ])
    })
}
