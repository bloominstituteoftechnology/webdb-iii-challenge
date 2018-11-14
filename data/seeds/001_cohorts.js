
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'FSW 14'},
        { name: 'FSW 15'},
        { name: 'FSW 16'},
        { name: 'FSW 17'}
      ]);
    });
};
