
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'venkateshwarlu', cohort_id: 1},
        { name: 'venky', cohort_id: 1},
        { name: 'chikky', cohort_id: 1},
        
          ]);
    });
};
