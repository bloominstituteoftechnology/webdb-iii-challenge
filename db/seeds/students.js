
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name:"Jonathan Holloway", cohort_id: 1},
        {name: "Jonathan H", cohort_id: 1},
        {name: "Mr Holloway", cohort_id: 1},
      ]);
    });
};
