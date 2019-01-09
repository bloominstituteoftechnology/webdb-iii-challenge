
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'Lambda FullStack Web Ninjas'},
        { name: 'Lambda Design Freaks'},
        { name: 'Lambda Infinity War Group'}
      ]);
    });
};
