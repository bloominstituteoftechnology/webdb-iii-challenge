exports.seed = function (knex, Promise) {
  
  return Promise.all([
    // Deletes ALL existing entries
    knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          { id: 1, name: 'Tom' },
          { id: 2, name: 'Jerry' },
          { id: 3, name: 'Ben' },
          { id: 4, name: 'Ting' },
          { id: 5, name: 'Connie' },
          { id: 6, name: 'Emily' },
          { id: 7, name: 'Angel' },
          { id: 8, name: 'Austin' },
          { id: 9, name: 'Rose' },
          { id: 10, name: 'Jack' },
        ]);
      }),

      knex('posts').del()
      .then(function () {
        // Inserts seed entries
        return knex('posts').insert([
          { id: 1, userId: 1, text: 'dfsdf' },
          { id: 2, userId: 2, text: 'dfd' },
          { id: 3, userId: 3, text: 'dfdf' },
          { id: 4, userId: 4, text: 'dfadf' },
          { id: 5, userId: 5, text: 'dsf' },
          { id: 6, userId: 6, text: 'dsaf' },
          { id: 7, userId: 7, text: 'dsf' },
          { id: 8, userId: 8, text: 'dsf' },
          { id: 9, userId: 9, text: 'dsf' },
          { id: 10, userId: 10, text: 'dsf' },
          { id: 11, userId: 11, text: 'adsf' },
        ]);
      }),

      knex('tags').del()
      .then(function () {
        // Inserts seed entries
        return knex('tags').insert([
          { id: 1, tag: 'JS' },
          { id: 2, tag: 'JAVA' },
          { id: 3, tag: 'Rails' },
          { id: 4, tag: 'Python' },
          { id: 5, tag: 'MySQL' },
          { id: 6, tag: 'React' },
          { id: 7, tag: 'Redux' },
          { id: 8, tag: 'Facebook' },
          { id: 9, tag: 'ES6' },
          { id: 10, tag: 'NodeJS' },
          { id: 11, tag: 'ExpressJS' },
          { id: 12, tag: 'VueJS' },
          { id: 13, tag: 'MongoDB' },
          { id: 14, tag: 'JQuery' },
          { id: 15, tag: 'JSX' },
          { id: 16, tag: 'PostGreSQL' },
          { id: 17, tag: 'MS' },
        ]);
      }),

      knex('posts_tags').del()
      .then(function () {
        // Inserts seed entries
        return knex('posts_tags').insert([
          { id: 1, post_id: 1,tag_id: 1 },
          { id: 2, post_id: 2,tag_id: 2 },
          { id: 3, post_id: 2,tag_id: 3 },
          { id: 4, post_id: 3,tag_id: 4 },
          { id: 5, post_id: 4,tag_id: 4 },
          { id: 6, post_id: 5,tag_id: 5 },
          { id: 7, post_id: 4,tag_id: 6 },
          { id: 8, post_id: 7,tag_id: 7 },
          { id: 9, post_id: 8,tag_id: 7 },
          { id: 10, post_id: 6,tag_id: 4},
          { id: 11, post_id: 3,tag_id: 8 },
          { id: 12, post_id: 4,tag_id: 9 },
          { id: 13, post_id: 8,tag_id: 10 },
          { id: 14, post_id: 7,tag_id: 11 },
          { id: 15, post_id: 9,tag_id: 10 },
          { id: 16, post_id: 10,tag_id: 9 },
          { id: 17, post_id: 11,tag_id: 11 }
        ]);     
      }),
  ])
};
