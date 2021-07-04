
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {id: 1, tag: 'rowValue1'},
        {id: 2, tag: 'rowValue2'},
        {id: 3, tag: 'rowValue3'}
      ]);
    });
};
