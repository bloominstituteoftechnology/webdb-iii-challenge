exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Posts').insert([
        { userId: 1, text: "Mark's Post 1" },
        { userId: 1, text: "Mark's Post 2" },
        { userId: 2, text: "Mike's Post" },
        { userId: 3, text: "Wendy's Post" }
      ]);
    });
};
