exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // truncate resets the ids back to 1
  return knex('cohorts')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'FSW14' }, // 1
        { name: 'FSW15' }, // 2
        { name: 'FSW16' }, // 3
        { name: 'FSW17' }, // 4
      ]);
    });
};