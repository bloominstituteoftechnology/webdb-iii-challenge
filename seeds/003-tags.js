
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {tag: 'bleep', createdAt:20180820085944},
        {tag: 'bloop', createdAt:20180820112544},
        {tag: 'blaap', createdAt:20180820122544}
      ]);
    });
};
