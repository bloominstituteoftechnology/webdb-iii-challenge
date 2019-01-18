
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, fresh slate every time you seed
  return knex('cohorts').truncate() //use truncate instead of del() in order to reset the ids instead of them incrementing
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'webpt2_eddy'},
        { name: 'webtpt2'},
        { name: 'cspt4'}
      ]);
    });
};
