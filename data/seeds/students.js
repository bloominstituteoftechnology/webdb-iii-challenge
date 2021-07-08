exports.seed = function(knex, Promise) {
  return knex('students').truncate()
    .then(function () {
      return knex('student').insert({
        { name: 'Evan' },
        { name: 'Test1' },
        { name: 'Test2' },
        { name: 'Test3' }
      });
    });
};
