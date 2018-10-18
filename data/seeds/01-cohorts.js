
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'CS10'},
        {name: 'CS13'},
        {name: 'CS09'}
      ]);
    });
};
