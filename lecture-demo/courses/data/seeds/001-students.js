exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // truncate resets the ids back to 1
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'sam' }, // 1
        { name: 'frodo' }, // 2
        { name: 'pippin' }, // 3
        { name: 'merry' }, // 4
      ]);
    });
};
