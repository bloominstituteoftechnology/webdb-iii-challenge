exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts_table').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts_table').insert([
        {name: 'FSW14'},
        {name: 'FSW33'},
        {name: 'FSW88'}
      ]);
    });
};