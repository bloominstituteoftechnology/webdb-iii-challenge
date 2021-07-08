
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'FSW14' }, // rowValue1
        { name: 'FSW14-PMs' }, // rowValue2
        { name: 'FSW15' }  // rowValue3
      ]);
    });
};
