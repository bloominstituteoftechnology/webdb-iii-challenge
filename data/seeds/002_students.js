
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { cohort_id: 9, name: 'kam'},
        { cohort_id: 9, name: 'yanrong'},
        { cohort_id: 9, name: 'katie'},
        { cohort_id: 9, name: 'shaw'},
        { cohort_id: 10, name: 'army'},
        { cohort_id: 10, name: 'navy'},
        { cohort_id: 10, name: 'air force'},
        { cohort_id: 10, name: 'marine'},
        { cohort_id: 11, name: 'google'},
        { cohort_id: 11, name: 'yahoo'},
        { cohort_id: 11, name: 'msn'},
        { cohort_id: 11, name: 'bing'},
        { cohort_id: 12, name: 'ebay'},
        { cohort_id: 12, name: 'amazon'},
        { cohort_id: 12, name: 'newegg'},
        { cohort_id: 12, name: 'best buy'},
      ]);
    });
};
