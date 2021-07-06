
exports.seed = function(knex, Promise) {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Web17'},
        {name: 'Web18'},
        {name: 'Web19'}
      ]);
};
