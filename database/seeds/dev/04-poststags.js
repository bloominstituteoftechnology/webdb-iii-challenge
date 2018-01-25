const faker = require('faker');

exports.seed = function(knex, Promise) {
  return knex('poststags')
    .del() // delete existing posttags
    .then(function() {
      const arr = [];
      const postId = faker.random.number({
        'min': 1,
        'max': 29
      });
      const tagId = faker.random.number({
        'min': 1,
        'max': 11
      });
      for (let i = 0; i < 29; i++) {
        arr.push({ postId, tagId });
      }
      return knex('poststags').insert(arr);
    });
};