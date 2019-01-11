exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'cspt2' },
        { name: 'cspt3' },
        { name: 'cspt4' },
        { name: 'cspt5' },
        { name: 'cspt6' },
        { name: 'cspt7' }
      ]);
    });
};
