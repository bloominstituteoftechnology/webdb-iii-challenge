
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSW', track: ''},
        {name: 'Data Science', track: ''},
        {name: 'iOS Development', track: ''}
      ]);
    });
};
