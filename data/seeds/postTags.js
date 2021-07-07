exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("post_tags")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("post_tags").insert([
        {
          id: 1,
          postId: 1,
          tagId: 1
        },
        {
          id: 2,
          postId: 2,
          tagId: 2
        },
        {
          id: 3,
          postId: 3,
          tagId: 3
        }
      ]);
    });
};
