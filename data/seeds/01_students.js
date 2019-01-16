
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Claude Shannon', track: 'Full Stack Web Development.', cohort_id: 1},
        {name: 'John McCarthy', track: 'Full Stack Web Development.', cohort_id: 1},
        {name: 'Mahershala Ali', track: 'Full Stack Web Development.', cohort_id: 1}
      ]);
    });
};
