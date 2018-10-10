exports.seed = (knex, Promise) =>
  knex('students')
    .truncate()
    .then(() => {
      return knex('students').insert([
        { name: 'Lucas Beemer', cohort_id: 1 },
        { name: 'Sayra Soriano', cohort_id: 2 }
      ]);
    });