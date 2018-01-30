const faker = require('faker');
exports.seed = function(knex, Promise) {
  return knex('tags')
    .del() // delete existing tags
    .then(function() {
      const arr = [];
      for (let i = 0; i < 14; i++) {
        arr.push({ tag: faker.random.word() });
      }
      return knex('tags').insert(arr);
    })
    .catch(err => {
      console.log(err);
    });
};