
exports.seed = function(knex, Promise) {
  return knex("cohorts")
    .truncate()
    .then(function () {
      return knex("cohorts").insert([
        { name: "FSW1000" },
        { name: "ML29834" },
        { name: "UI81203" }
      ]);
    });
};
