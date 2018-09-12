
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { name: 'Hermione', cohort_id: 'CS Alpha' },
        { name: 'Ron', cohort_id: 'CS Beta' },
        { name: 'Harry', cohort_id: 'CS Theta' }
      ]);
    });
};
