
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSW18', track: 'Full Stack Web Development.'},
        {name: 'DS2', track: 'Data Science'},
        {name: 'iOSD2', track: 'iOS Development'}
      ]);
    });
};
