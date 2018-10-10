exports.seed = (knex, Promise) =>
  knex('cohorts')
    .truncate()
    .then(() => {
      return knex('cohorts').insert([
        { name: 'FSW13', id: 1 },
        { name: 'FSW14', id: 2 }
      ]);
    });