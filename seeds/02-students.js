
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Bob'},
        {cohort_id: 1, name: 'Bill'},
        {cohort_id: 1, name: 'Betsy'},
        {cohort_id: 2, name: 'Mike'},
        {cohort_id: 2, name: 'Mary'},
        {cohort_id: 2, name: 'Melissa'},
        {cohort_id: 3, name: 'Julius'},
        {cohort_id: 3, name: 'Marcus Aurelius'}
      ]);
    });
};
