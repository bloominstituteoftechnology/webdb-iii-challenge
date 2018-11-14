
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'CS 12' }, // 1
        { name: 'CS 13' }, // 2
        { name: 'FSW 14' }, // 3
        { name: 'FSW 15' }, // 4
      ]);
    });
};
