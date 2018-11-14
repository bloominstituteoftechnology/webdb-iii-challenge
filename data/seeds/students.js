exports.seed = knex =>
  knex("students")
    .truncate()
    .then(() =>
      knex("students").insert([
        { cohort_id: 1, name: "one" },
        { cohort_id: 1, name: "two" },
        { cohort_id: 1, name: "three" },
        { cohort_id: 2, name: "four" },
        { cohort_id: 2, name: "five" },
        { cohort_id: 3, name: "six" }
      ])
    );
