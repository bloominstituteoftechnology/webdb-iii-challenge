
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {
          tag: 'Tag1',
        },
        {
          tag: 'Tag2',
        },
        {
          tag: 'Tag3',
        }
      ]);
    });
};
