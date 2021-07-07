
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {cohort_name: 'FSW10'},
        {cohort_name: 'FSW11'},
        {cohort_name: 'FSW12'},
        {cohort_name: 'FSW13'},
        {cohort_name: 'FSW14'},
        {cohort_name: 'FSW15'},
        {cohort_name: 'iOS2'}
      ]);
    });
};
