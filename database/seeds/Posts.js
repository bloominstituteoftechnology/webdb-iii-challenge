
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          userId: 1,
          text: 'You think water moves fast?' +
          'You should see ice. It moves like it has a mind. '
        },

        {
          id: 2,
          userId: 2,
          text: 'Like you, I used to think the world' +
          'was this great place where everybody lived by the same standards'
        },

        {
          id: 3,
          userId: 3,
          text: 'You see? Its curious. Ted did figure it out, time travel'
        }
      ]);
    });
};
