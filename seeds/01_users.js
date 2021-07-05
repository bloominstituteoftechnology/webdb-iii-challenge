
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'Cesar' },
        { id: 2, name: 'Ted' },
        { id: 3, name: 'Luke' }
      ])
    })
}
