
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'John', createdAt: knex.fn.now()},
        {name: 'Rachel', createdAt: knex.fn.now()},
        {name: 'Saul', createdAt: knex.fn.now()},
        {name: 'John2', createdAt: knex.fn.now()},
        {name: 'Rachel2', createdAt: knex.fn.now()},
        {name: 'Saul2', createdAt: knex.fn.now()}
      ]);
    });
};
