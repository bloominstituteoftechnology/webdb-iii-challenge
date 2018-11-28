exports.seed = function (knex, Promise) {
  return knex('cohorts')
    .truncate()
    .then(function () {
      return knex('cohorts').insert([
        { name: 'FSW1'},
        { name: 'FSW2'},
        { name: 'FSW3'},
        { name: 'FSW4'},
        { name: 'FSW5'},
        { name: 'FSW6'},
        { name: 'FSW7'},
        { name: 'FSW8'},
        { name: 'FSW9'},
        { name: 'FSW10'},
        { name: 'FSW11'},
        { name: 'FSW12'},
        { name: 'FSW13'},
        { name: 'FSW14'},
        { name: 'FSW15'},
        { name: 'FSW16'}
        ]);
    });
};