exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("courses")
    .del() //delete records from table
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
        { name: "Computer Science", started: true },
        { name: "UI/UX", started: false },
        { name: "Full Stack Web", started: false }
      ]);
    });
};


