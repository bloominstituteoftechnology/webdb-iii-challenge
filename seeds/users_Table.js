
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'elon musk'},
        {id: 2, name: 'linus torvald'},
        {id: 3, name: 'al einstein'},
        {id: 4, name: 'guido von rossum'}
      ]);
    });
};
