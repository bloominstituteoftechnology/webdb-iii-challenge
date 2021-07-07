exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("posts").insert([
        {
          id: 1,
          userId: 1,
          text: "post test 1"
        },
        {
          id: 2,
          userId: 2,
          text: "post test 2"
        },
        {
          id: 3,
          userId: 3,
          text: "post test 3"
        }
      ]);
    });
};
