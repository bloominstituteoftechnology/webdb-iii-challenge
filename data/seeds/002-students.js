
exports.seed = function(knex, Promise) {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Bernard Jacobs', cohort_id: 'Web17'},
        {name: 'Luke Thompson', cohort_id: 'Web18'},
        {name: 'Kelly Hanson', cohort_id: 'Web19'}
      ]);
};
