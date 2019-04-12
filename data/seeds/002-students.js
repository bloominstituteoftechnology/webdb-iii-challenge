
exports.seed = function(knex, Promise) {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Bernard Jacobs', cohort_id: '1'},
        {name: 'Luke Thompson', cohort_id: '2'},
        {name: 'Kelly Hanson', cohort_id: '3'}
      ]);
};
