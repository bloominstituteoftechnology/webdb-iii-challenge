
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'CSPT2'},
        {id: 2, name: 'FSWPT'},
        {id: 3, name: 'WEBPT2'}
      ]);
    });
};
