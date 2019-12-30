
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {userId: 1, name: 'elon musk'},
        {userId: 2, name: 'linus torvald'},
        {userId: 3, name: 'al einstein'},
        {userId: 4, name: 'guido von rossum'}
      ]);
    });
};
