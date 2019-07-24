const faker = require('faker');

exports.seed = function(knex, Promise) {
  return knex('posts')
    .del() // delete existing posts
    .then(function() {
      const arr = [];
      const userId = faker.random.number({
        'min': 1,
        'max': 9
      });
      for (let i = 0; i < 37; i++) {
        arr.push({ userId, text: faker.lorem.sentence() });
      }
      return knex('posts').insert(arr);
    })
    .catch(err => {
      console.log(err);
    });
};