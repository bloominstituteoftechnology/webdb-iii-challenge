
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('studentstwo').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('studentstwo').insert([
        {name: 'Elijah', cohort_id: 7},
        {name: 'Henry', cohort_id: 8},
        {name: 'Zeus', cohort_id: 9}
      ]);
    });
};

