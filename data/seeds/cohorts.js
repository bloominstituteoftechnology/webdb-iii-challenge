
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { id: 1, name: 'FSW1'},
        { id: 2, name: 'FSW2'},
        { id: 3, name: 'FSW3'},
      ]);
    });
};
