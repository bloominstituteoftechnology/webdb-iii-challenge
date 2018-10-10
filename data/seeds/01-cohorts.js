
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'cs13' },
        { name: 'cs14' },
        { name: 'cs15' }
      ]);
    });
};
