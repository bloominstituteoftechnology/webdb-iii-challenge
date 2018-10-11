
exports.seed = function(knex, Promise) {
  return knex('cohorts').truncate()
    .then(function () {
      return knex('cohorts').insert([
        {name: "CS1"},
        {name: "CS2"},
        {name: "CS3"},
        {name: "CS4"},
        {name: "CS5"},
        {name: "CS6"},
        {name: "CS7"},
        {name: "CS8"},
        {name: "CS9"},
        {name: "CS10"},
        {name: "CS11"},
        {name: "CS12"},
        {name: "FSW13"},
        {name: "FSW14"},
        {name: "FSW15"}
      ]);
    });
};
