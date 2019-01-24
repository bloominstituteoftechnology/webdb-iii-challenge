
exports.seed = function(knex, Promise) {
  return knex('table_name').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {name: 'CJ' , cohorts_id: 1},
        {name: 'DJ' , cohorts_id: 1},
        {name: 'TJ' , cohorts_id: 2},
        {name: 'LJ' , cohorts_id: 2}
      ]);
    });
};
