exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(() => {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Adam', cohort_id: 12 },
        { name: 'Rachel', cohort_id: 12 },
        { name: 'John', cohort_id: 12 }
      ]);
    });
};
