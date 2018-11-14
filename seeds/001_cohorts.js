
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'fsw10'},
        { name: 'fsw11'},
        { name: 'fsw12'},
        { name: 'fsw13'},
        { name: 'fsw14'}
      ]);
    });
};
