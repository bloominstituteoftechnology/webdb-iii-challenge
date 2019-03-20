
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohort').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohort').insert([
        {name: 'WEBPT1'},
        {name: 'WEBPT2'},
        {name: 'WEBPT3'}
      ]);
    });
};
