
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'fullstack1'},
        {name: 'fullstack2'},
        {name: 'pt_fullstack1'}
      ]);
    });
};
