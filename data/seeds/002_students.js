exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([

        { name: "Riley", cohort_id: 1 },
        { name: "Luis", cohort_id: 1 },
        { name: "Josh", cohort_id: 2 }

      ]);
    });
};