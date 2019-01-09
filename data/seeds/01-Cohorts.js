
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "webpt2" }, 
        { name: "FSW19" }, 
        { name: "FSW24" }]);
    });
};
