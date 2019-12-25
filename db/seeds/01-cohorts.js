
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'UX/UI'},
        { name: 'Express'},
        { name: 'React'}
      ]);
    });
};
