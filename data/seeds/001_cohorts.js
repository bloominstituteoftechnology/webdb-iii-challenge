
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'FSW12'},
        { name: 'FSW13'},
        { name: 'FSW14'},
        { name: 'FSW15'},
        { name: 'FSW16'},
        { name: 'iOS8'},
        { name: 'iOS9'},
        { name: 'iOS10'},
        { name: 'iOS11'},
        { name: 'DS1'},
        { name: 'DS2'},
        { name: 'DS3'},
        { name: 'DS4'},
        { name: 'ML1'},
        { name: 'ML2'},
        { name: 'ML3'},
        { name: 'ML4'},
        { name: 'PT1'},
        { name: 'PT2'},
        { name: 'PT3'}
        ]);
    });
};
