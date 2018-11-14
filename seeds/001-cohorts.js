exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'FSW12' }, // 1
        { name: 'FSW13' }, // 2
        { name: 'FSW14' } // 3
      ]);
    });
};
