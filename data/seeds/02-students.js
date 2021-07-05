
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: "Thor Odinson", cohort_id: 1},
        { name: "Bruce Banner", cohort_id: 1},
        { name: "Tony Stark", cohort_id: 2}
      ]);
    });
};
