
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { name: 'fsw1'},
        { name: 'fsw2'},
        { name: 'fsw3'}
      ]);
    });
};
