exports.seed = async knex => {
  // Deletes ALL existing entries
  try {
    knex("cohorts").del();
    return await knex("cohorts").insert([
      { id: 1, name: "FSWPT-4" },
      { id: 2, name: "CSPT-3" },
      { id: 3, name: "USPT-1" }
    ]);
  } catch (err) {
    console.log(err);
  }
};
