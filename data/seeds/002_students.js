
exports.seed = function (knex, Promise) {
  return knex('students')
    .truncate()
    .then(function () {
      return knex('students').insert([
        { "name": "Latisha Slowey", "cohort_id": 1 },
        { "name": "Pietro Shepherd", "cohort_id": 2 },
        { "name": "Broddie Dallicoat", "cohort_id": 3 },
        { "name": "Connor Bastock", "cohort_id": 4 },
        { "name": "Norah Prendergast", "cohort_id": 5 },
        { "name": "Timothy Sill", "cohort_id": 6 },
        { "name": "Dorree Tremaine", "cohort_id": 7 },
        { "name": "Brier Moorman", "cohort_id": 8 },
        { "name": "Costa Lonnon", "cohort_id": 9 },
        { "name": "Joseph Inker", "cohort_id": 10 },
        { "name": "Venus Pickup", "cohort_id": 11 },
        { "name": "Hewitt Trenholme", "cohort_id": 12 },
        { "name": "Kort O'Hagirtie", "cohort_id": 13 },
        { "name": "Greggory Dunn", "cohort_id": 14 },
        { "name": "Clementine Sacks", "cohort_id": 15 },
        { "name": "Thorn Wadge", "cohort_id": 16 }
        ]);
    })}
