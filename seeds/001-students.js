exports.seed = async knex => {
  // Deletes ALL existing entries
  try {
    knex("students").del();
    return await knex("students").insert([
      { id: 1, name: "FSWPT-4", cohort_id: 1 },
      { id: 2, name: "CSPT-3", cohort_id: 2 },
      { id: 3, name: "USPT-1", cohort_id: 3 }
    ]);
  } catch (err) {
    console.log(err);
  }
};
