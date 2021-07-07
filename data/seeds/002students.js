
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name:'Scrooge McDuck', cohort_id:3},
        {name: 'Brock Lesnar', cohort_id:3},
        {name: 'Narf Wingetagh', cohort_id:2},
        {name: 'Casey Jones', cohort_id:1},
      ]);
    });
};
