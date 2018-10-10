exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .del()
    .then(function() {
      return knex('cohorts').insert([{ name: 'FSW13' }, { name: 'FSW14' }]);
    });
};
