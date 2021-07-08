
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSW10'},
        {name: 'FSW11'},
        {name: 'FSW12'}
      ]);
    });
};
