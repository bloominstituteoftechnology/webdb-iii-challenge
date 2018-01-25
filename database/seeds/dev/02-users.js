const faker = require('faker');

exports.seed = function(knex, Promise) {
  return knex('users')
    .del() // delete existing users
    .then(function() {
      const arr = [];
      for (let i = 0; i < 9; i++) {
        arr.push({ name: faker.name.findName() });
      }
      return knex('users').insert(arr);
    });
};