
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {tag: 'bleep', createdAt: knex.fn.now()},
        {tag: 'bloop', createdAt: knex.fn.now()},
        {tag: 'blaap', createdAt: knex.fn.now()},
        {tag: 'bleep 2222222', createdAt: knex.fn.now()},
        {tag: 'bloop  2222222', createdAt: knex.fn.now()},
        {tag: 'blaap 222222222', createdAt: knex.fn.now()}
      ]);
    });
};
