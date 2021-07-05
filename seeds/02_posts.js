
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        { 
          text: 'This is the 1st post', 
          userId: 1
        },
        { 
          text: 'This is the 2nd post', 
          userId: 2
        },
        { 
          text: 'This is the 3rd post', 
          userId: 3
        }
      ]);
    });
};
