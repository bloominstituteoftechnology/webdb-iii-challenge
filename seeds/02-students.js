
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('student').del()
    .then(function () {
      // Inserts seed entries
      return knex('student').insert([
        { name: 'Hermione', cohort_id: 'CS_Alpha' },
        { name: 'Ron', cohort_id: 'CS_Beta' },
        { name: 'Harry', cohort_id: 'CS_Theta' }
      ]);
    });
};
