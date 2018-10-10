// Test data for cohorts table on lambda.sqlite3 database.
exports.seed = function(knex, Promise) {

  // Truncates ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'FSW13' },
        { name: 'CSPT3' },
        { name: 'FSW1' }
      ]);
    });
};
