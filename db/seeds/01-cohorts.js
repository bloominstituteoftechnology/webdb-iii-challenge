
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'fsw12', started: true},
        {name: 'fsw13', started: true},
        {name: 'fsw14', started: true},
        {name: 'fsw15', started: false},
        {name: 'fsw16', started: false}
      ]);
    });
};
