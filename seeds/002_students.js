
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { cohorts_id: 1, name: 'Sumi' },
        { cohorts_id: 2, name: 'Jasmine' },
        { cohorts_id: 3, name: 'Lee' },
        { cohorts_id: 3, name: 'Zubi' }
      ]);
    });
};
