
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { name: 'FSW14' }, // rowValue1
        { name: 'FSW15' }, // rowValue2
        { name: 'FSW15' }  // rowValue3
      ]);
    });
};
