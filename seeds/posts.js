exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([
        { post: 'pink', userId: 1 },
        { post: 'love', userId: 1 },
        { post: 'ice cream', userId: 2 }
      ]);
    });
};

// to run the database
// yarn knex migrate:latest
// yarn knex seed:run
