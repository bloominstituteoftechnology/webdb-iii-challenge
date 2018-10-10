
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {name: 'James Bond', cohorts_id: 1},
        {name: 'Steph Curry', cohorts_id: 2},
        {name: 'August Rush', cohorts_id: 3}
      ]);
    });
};
