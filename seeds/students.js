
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'John' , cohort_id: 1},
        {id: 2, name: 'Rachel', cohort_id:2},
        {id: 3, name: 'Jordan' ,cohort_id:3},
        {id:4, name:   'Adam', cohort_id: 4 }
      ]);
    });
};
