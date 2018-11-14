exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .del()
    .then(function() {
      return knex('cohorts').insert([
        { name: 'CS13' },
        { name: 'FWS14' },
        { name: 'FSW15' },
        { name: 'FSW4PT' }
      ]);
    });
};
