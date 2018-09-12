
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Justin'},
        {name: 'John'},
        {name: 'Dave'}
      ]);
    });
};
