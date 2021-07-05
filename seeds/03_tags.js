
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        { id: 1, tag: 'personal' },
        { id: 2, tag: 'finance' },
        { id: 3, tag: 'work' },
        { id: 4, tag: 'recreational' },
        { id: 5, tag: 'gym' }
      ])
    })
}
