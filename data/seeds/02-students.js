
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Pascale Pierre', cohort_id:1},
        {name: 'Sean Kohler',cohort_id:3},
        {name: 'Ruby Tuesday', cohort_id:1}
      ]);
    });
};
