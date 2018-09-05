const knex = require("knex");
const dbConfig = require("../knexfile");

const db = knex(dbConfig.development);

exports.get = async (req, res) => {
  try {
    const data = await db.select().table(`cohorts`);
    res.status(200).json({
      status: true,
      cohortData: data
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: `Not abble to retrive your data`
    });
  }
};

exports.getId = async (req, res) => {
  try {
    const data = await db(`cohorts`)
      .where({
        id: req.params.id
      })
      .select();

    res.status(200).json({
      status: true,
      cohortData: data
    });
  } catch (err) {}
};

exports.getStudents = async (req, res) => {
  try {
    const data = await db(`students`)
      .where({
        cohort_id: req.params.id
      })
      .select();

    res.status(200).json({
      status: true,
      students: data
    });
  } catch (err) {}
};

exports.post = async (req, res) => {
  try {
    const inserted = await db(`cohorts`).insert({
      name: req.body.name
    });

    res.status(200).json({
      status: true,
      id: inserted[0]
    });
  } catch (err) {}
};

exports.put = async (req, res) => {
  try {
    const updated = await db(`cohorts`)
      .where({
        id: req.params.id
      })
      .update("name", req.body.name);
    res.status(200).json({
      status: true,
      updateId: updated
    });
  } catch (err) {}
};

exports.del = async (req, res) => {
  try {
    const deletedID = await db(`cohorts`)
      .where({
        id: req.params.id
      })
      .del();
    res.status(200).json({
      status: true,
      deletedID: deletedID
    });
  } catch (err) {}
};
