
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'web14'},
        {name: 'ios2'},
        {name: 'android3'}
      ]);
    });
};
