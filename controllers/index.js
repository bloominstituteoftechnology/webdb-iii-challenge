const knex = require("knex");
const dbConfig = require("../knexfile");

const db = knex(dbConfig.development);

exports.get = async (req, res) => {
  try {
    const data = await db.select().table(req.tableName);
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
    const data = await db(req.tableName)
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

exports.getStudentId = async (req, res) => {
  try {
    const data = await db
      .select(
        "students.id as id",
        "students.name as name",
        "cohorts.name as cohort"
      )
      .from("students")
      .innerJoin("cohorts", "students.cohort_id", "cohorts.id")
      .where({ "students.id": req.params.id });

      res.status(200).json({
        status: true,
        data: data
      })
  } catch (err) {}
};

exports.post = async (req, res) => {
  try {
    const inserted = await db(req.tableName).insert({
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
    const updated = await db(req.tableName)
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
    const deletedID = await db(req.tableName)
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
