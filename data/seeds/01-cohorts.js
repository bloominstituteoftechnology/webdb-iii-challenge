
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'CS8'},
        { name: 'CS10'},
        { name: 'FSW12'}
      ]);
    });
};
