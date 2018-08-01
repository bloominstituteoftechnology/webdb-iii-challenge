
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Posttags').del()
    .then(function () {
      // Inserts seed entries
      return knex('Posttags').insert([
        {id: 1, postid: 1, tagid: 1},
        {id: 2, postid: 1, tagid: 2},
        {id: 3, postid: 1, tagid: 3},
        {id: 4, postid: 2, tagid: 1},
        {id: 5, postid: 2, tagid: 2},
        {id: 6, postid: 3, tagid: 2},
        {id: 7, postid: 3, tagid: 3},
        {id: 8, postid: 4, tagid: 1},
        {id: 9, postid: 4, tagid: 3},
      ]);
    });
};
