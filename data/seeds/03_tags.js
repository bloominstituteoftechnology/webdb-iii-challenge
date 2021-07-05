
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {tag: 'cs11'},
            {id: 1, tag: 'javascript'},
            {id: 2, tag: 'node'},
            {id: 3, tag: 'react'},
            {id: 4, tag: 'redux'},
            {id: 5, tag: 'sql'}
      ]);
    });
};
