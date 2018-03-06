
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, userId: 1, text: 'Random info goes here.'},
        {id: 2, userId: 2, text: 'Random info goes here.'},
        {id: 3, userId: 3, text: 'Random info goes here.'}
      ]);
    });
};
