exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(() => {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'CS1' },
        { name: 'CS2' },
        { name: 'CS3' },
        { name: 'CS4' },
        { name: 'CS5' },
        { name: 'CS6' },
        { name: 'CS7' },
        { name: 'CS8' },
        { name: 'CS9' },
        { name: 'CS10' },
        { name: 'CS11' },
        { name: 'CS12' },
        { name: 'CS13' },
        { name: 'CS14' },
        { name: 'CSPT1' },
        { name: 'CSPT2' }
      ]);
    });
};
