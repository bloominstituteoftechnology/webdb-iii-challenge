exports.seed = (knex, Promise) =>
  knex('students')
    .truncate()
    .then(() => {
      return knex('students').insert([
        { name: 'Kevin Sooter', cohort_id: 1 },
        { name: 'Jason Sooter', cohort_id: 2 }
      ]);
    });
