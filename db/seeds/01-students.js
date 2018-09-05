
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Das', cohort_id: 1},
        {name: 'Jas', cohort_id: 1},
        {name: 'Benny', cohort_id: 2},
        {name: 'Luke', cohort_id: 2},
        {name: 'Victor', cohort_id: 3},
        {name: 'Pam', cohort_id: 3},
        {name: 'Viper', cohort_id: 4},
        {name: 'Kimono', cohort_id: 4},
        {name: 'Alice', cohort_id: 5},
        {name: 'Victor', cohort_id: 5},
        {name: 'Mike', cohort_id: 6},
        {name: 'Vice', cohort_id: 6},
      ]);
    });
};
