
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'John', createdAt: 20180820082544},
        {name: 'Rachel', createdAt:20180820092544},
        {name: 'Saul', createdAt:20180820102544}
      ]);
    });
};
