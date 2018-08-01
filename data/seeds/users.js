exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          name: "name test 1"
        },
        {
          id: 2,
          name: "name test 2"
        },
        {
          id: 3,
          name: "name test 3"
        }
      ]);
    });
};
