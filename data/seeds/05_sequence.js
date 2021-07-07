
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sqlite_sequence').del()
    .then(function () {
      // Inserts seed entries
      return knex('sqlite_sequence').insert([
        {name: 'Users', seq: 3},
        {name: 'Posts', seq: 9},
        {name: 'Tags', seq: 3},
        {name: 'PostTags', seq: 9}
      ]);
    });
};
