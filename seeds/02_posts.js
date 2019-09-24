
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {userId: 1, text:'hello'},
        {userId: 2, text:'hello a'},
        {userId: 3, text:'hello b'},
      ]);
    });
};
