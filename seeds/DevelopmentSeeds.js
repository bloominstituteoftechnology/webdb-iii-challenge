
exports.seed = function(knex, Promise) {

  return Promise.all([
    
    knex('Users').del().then(function () {
        
      return knex('Users').insert([
        { id: 1, name: 'User One' },
        { id: 2, name: 'User Two' },
        { id: 3, name: 'User Three' }
      ]);

    }),

    knex('Posts').del().then(function () {
        
      return knex('Posts').insert([
        { id: 1, userId: 1, text: 'Post One' },
        { id: 2, userId: 2, text: 'Post Two' },
        { id: 3, userId: 3, text: 'Post Three' }
      ]);

    }),

    knex('Tags').del().then(function () {
        
      return knex('Tags').insert([
        { id: 1, tag: 'Tag One' },
        { id: 2, tag: 'Tag Two' },
        { id: 3, tag: 'Tag Three' }
      ]);

    }),

    knex('Posts_Tags').del().then(function () {
        
      return knex('Posts_Tags').insert([
        { id: 1, postId: 1, tagId: 1 },
        { id: 2, postId: 2, tagId: 2 },
        { id: 3, postId: 2, tagId: 2 }
      ]);

    }),


  ]);

};
