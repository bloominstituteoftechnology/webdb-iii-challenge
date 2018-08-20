
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {text: 'bleep', createdAt:20180820085944},
        {text: 'bloop', createdAt:20180820112544},
        {text: 'blaap', createdAt:20180820122544}
      ]);
    });
};
