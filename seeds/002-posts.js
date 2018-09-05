
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {userId: 5, text: 'Blog post bleep.', createdAt: knex.fn.now()},
        {userId: 5, text: 'Blog post bloop.', createdAt: knex.fn.now()},
        {userId: 6, text: 'Blog post blaap.', createdAt: knex.fn.now()}, 
        {userId: 5, text: 'Blog post bleep 222222222.', createdAt: knex.fn.now()},
        {userId: 5, text: 'Blog post bloop 222222222222.', createdAt: knex.fn.now()},
        {userId: 4, text: 'Blog post blaap 222222222222.', createdAt: knex.fn.now()},
      ]);
    });
};
