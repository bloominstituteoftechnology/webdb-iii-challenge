
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'FSW 12'}, //1
        {name: 'FSW 13'}, //2
        {name: 'FSW 14'} //3
      ]);
    });
};
