
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { id: 1, name: 'Kat', cohort_id: 1 },    // {id: 1, colName: 'rowValue1'},
        { id: 2, name: 'Yanrong', cohort_id: 1 }, 
        { id: 3, name: 'Kamry', cohort_id: 2 }  
      ]);
    });
};
