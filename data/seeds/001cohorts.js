exports.seed = function (knex, Promise) {
  return knex("cohorts")
    .truncate()
    .then(function () {
      return knex("cohorts").insert([
        { name: "WEB DEVELOPMENT" },
        { name: "IOS DEVELOPMENT" },
        { name: "DATA SCIENCE" },
        { name: "UX DESIGN" },
        { name: "MACHINE LEARNING" }
      ]);
    });
};