const cohortData = [{ "id": 1, "name": "Wrapsafe" }, { "id": 2, "name": "Rank" }, { "id": 3, "name": "Bitchip" }, { "id": 4, "name": "Duobam" }, { "id": 5, "name": "Holdlamis" }, { "id": 6, "name": "Cookley" }, { "id": 7, "name": "Hatity" }, { "id": 8, "name": "Konklab" }, { "id": 9, "name": "Wrapsafe" }, { "id": 10, "name": "Veribet" }]
const studentData = [{
  "id": 1,
  "name": "brayson0",
  "cohort_id": 1
}, {
  "id": 2,
  "name": "kshakle1",
  "cohort_id": 2
}, {
  "id": 3,
  "name": "isemeniuk2",
  "cohort_id": 3
}, {
  "id": 4,
  "name": "dsayre3",
  "cohort_id": 4
}, {
  "id": 5,
  "name": "gsparshutt4",
  "cohort_id": 5
}, {
  "id": 6,
  "name": "cgarrity5",
  "cohort_id": 6
}, {
  "id": 7,
  "name": "tdury6",
  "cohort_id": 7
}, {
  "id": 8,
  "name": "ebaukham7",
  "cohort_id": 8
}, {
  "id": 9,
  "name": "mgavrielli8",
  "cohort_id": 9
}, {
  "id": 10,
  "name": "dcooke9",
  "cohort_id": 10
}]

exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .del() // delete existing cohorts
    .then(function() {
      return knex('cohorts').insert(cohortData)
        .then(function() {
          return knex('students').del().then(function() {
            return knex('students').insert(studentData) 
          }) 
        });
    });
};
