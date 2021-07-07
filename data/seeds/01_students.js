exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "John", cohort_id: 1 },
        { name: "James", cohort_id: 3 },
        { name: "Dylan", cohort_id: 2 },
        { name: "Frederick", cohort_id: 6 },
        { name: "Rosa", cohort_id: 8 },
        { name: "Denise", cohort_id: 6 },
        { name: "Aaron", cohort_id: 3 },
        { name: "Travis", cohort_id: 5 },
        { name: "Douglas", cohort_id: 7 },
        { name: "Dawn", cohort_id: 9 },
        { name: "Jasmine", cohort_id: 6 },
        { name: "Anthony", cohort_id: 5 },
        { name: "Bill", cohort_id: 4 },
        { name: "Shawn", cohort_id: 3 },
        { name: "Bradley", cohort_id: 2 },
        { name: "Elton", cohort_id: 4 },
        { name: "Carlton", cohort_id: 1 },
        { name: "Jessica", cohort_id: 8 },
        { name: "Derrick", cohort_id: 9 },
        { name: "Ericka", cohort_id: 8 },
        { name: "April", cohort_id: 2 },
        { name: "Steve", cohort_id: 3 },
        { name: "Donny", cohort_id: 7 },
        { name: "Ralph", cohort_id: 7 },
        { name: "Lucy", cohort_id: 2 },
        { name: "Zack", cohort_id: 4 },
        { name: "Parker", cohort_id: 6 }
      ]);
    });
};
