
exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .truncate()
    .then(function () {
      return knex('cohorts').insert([
        {name: 'Web Development'},
        {name: 'UI/UX'},
        {name: 'Data Science'}
      ]);
    });
};
