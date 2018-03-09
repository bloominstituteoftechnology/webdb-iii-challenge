
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {tagId: 1, tag: 'rowValue1'},
        {tagId: 2, tag: 'rowValue2'},
        {tagId: 3, tag: 'rowValue3'}
      ]);
    });
};
