const faker = require('faker');

exports.seed = function (knex, Promise) {
  
  return Promise.all([
    // Deletes ALL existing entries
    knex('users').del()
      .then(function () {
        // Inserts seed entries
        const arr = [];
        for(let i = 0; i < 15; i++) {
          arr.push({ name: faker.name.findName() });
        }
        return knex('users').insert(arr);
      }),

      knex('posts').del()
      .then(function () {
        // Inserts seed entries
        const arr = [];
        for(let i = 0; i < 15; i++) {
          arr.push({ userId: i+1, text: faker.lorem.text() });
        }
        return knex('posts').insert(arr);
      }),

      knex('tags').del()
      .then(function () {
        // Inserts seed entries
        const arr = [];
        for(let i = 0; i < 15; i++) {
          arr.push({ tag: faker.lorem.word() });
        }
        return knex('tags').insert(arr);
      }),

      knex('posts_tags').del()
      .then(function () {
        // Inserts seed entries
        const arr = [];
        for(let i = 0; i < 15; i++) {
          post_id = faker.random.number({
            'min': 1,
            'max': 15
          });
          tag_id = faker.random.number({
            'min': 1,
            'max': 15
          });
          arr.push({ post_id, tag_id });
        }
        return knex('posts_tags').insert(arr);     
      }),
  ])
};
