exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { id: 1, name: "mikko 1" },
        { id: 2, name: "mikko 2" },
        { id: 3, name: "mikko 3" },
        { id: 4, name: "mikko 4" },
        { id: 5, name: "mikko 5" },
        { id: 6, name: "mikko 6" },
        { id: 7, name: "mikko 7" },
        { id: 8, name: "mikko 8" },
        { id: 9, name: "mikko 9" },
        { id: 10, name: "mikko 10" },
        { id: 11, name: "mikko 11" },
        { id: 12, name: "mikko 12" },
        { id: 13, name: "mikko 13" },
        { id: 14, name: "mikko 14" },
        { id: 15, name: "mikko 15" },
        { id: 16, name: "mikko 16" },
        { id: 17, name: "mikko 17" },
        { id: 18, name: "mikko 18" },
        { id: 19, name: "mikko 19" },
        { id: 20, name: "mikko 20" },
        { id: 21, name: "mikko 21" },
        { id: 23, name: "mikko 22" },
        { id: 24, name: "mikko 22" },
        { id: 25, name: "mikko 23" }
      ]);
    });
};
