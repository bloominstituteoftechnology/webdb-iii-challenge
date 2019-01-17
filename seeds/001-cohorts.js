
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Full Stack Web 15'},
        {name: 'Full Stack Web 18'},
        {name: 'iOS 3'},
        {name: 'UX 41'}
      ]);
    });
};
