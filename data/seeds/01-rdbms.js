
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rdbms').del()
    .then(function () {
      // Inserts seed entries
      return knex('rdbms').insert([
        {firstName: 'Shepard', puppies: true},
        {firstName: 'Fluffy', puppies: true},
        {firstName: 'Dana', puppies: false}
      ]);
    });
};
  