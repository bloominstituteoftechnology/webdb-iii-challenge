exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('students')
      .truncate()
      .then(function () {
        // Inserts seed entries
        return knex('students').insert([
          { name: 'Lucas', cohort_id: 3},
          { name: 'Tom', cohort_id: 3},
          { name: 'Bob', cohort_id: 3}
        ]);
      });
  };