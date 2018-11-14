
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'cs11'},
        {name: 'cs12'},
        {name: 'cs13'},
        {name: 'cs14'}
      ]);
    });
};
