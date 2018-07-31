
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('Tags').insert([
        {
          id: 1,
          tag: 'avenger'
        },
        {
          id: 2,
          tag: 'DC comics'
        },
        {
          id: 3,
          tag: 'xmen'
        }
      ]);
    });
};
