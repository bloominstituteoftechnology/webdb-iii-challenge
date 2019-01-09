
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'Group 1' },
        { name: 'Group 2' },
        { name: 'Group 3' },
        { name: 'Group 4' }
      ]);
    });
};
