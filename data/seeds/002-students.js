
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Kat', cohort_id: 1 },    // {id: 1, colName: 'rowValue1'},
        { name: 'Katie', cohort_id: 1 }, 
        { name: 'Yanrong', cohort_id: 1 }  
      ]);
    });
};
