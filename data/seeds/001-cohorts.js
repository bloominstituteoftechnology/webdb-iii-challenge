exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'fsw11' },
        { name: 'fsw12' },
        { name: 'fsw13' },
        { name: 'fsw14' },
        { name: 'fsw15' }
      ]);
    });
};
