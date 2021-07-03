
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Kousaka Honoka', cohort_id: 3},
        {name: 'Yazawa Nicocchi', cohort_id: 1},
        {name: 'Nishikino Maki', cohort_id: 3}
      ]);
    });
};
