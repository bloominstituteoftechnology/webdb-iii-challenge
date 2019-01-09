exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohort')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cohort').insert([
        { name: 'Full Stack Web Part-time 2' },
        { name: 'iOS 1' },
        { name: 'Android 1' }
      ]);
    });
};
