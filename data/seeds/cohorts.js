exports.seed = knex =>
  knex("cohorts")
    .truncate()
    .then(() =>
      knex("cohorts").insert([
        { name: "FSW14" },
        { name: "FSW15" },
        { name: "FSW16" }
      ])
    );
