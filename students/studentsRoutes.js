const express = require("express");
const route = express.Router();
const db = require("../data/dbConfig");

route.get("/", async (req, res) => {
  const students = await db("students");

  try {
    res.json(students);
  } catch (err) {
    res.json({ error: "Could not retrieve students data." });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const student = await db("students")
      .where({ id })
      .first();
    !student
      ? res
          .status(404)
          .json({ error: "The student with this id does not exist." })
      : res.json(student);
  } catch (err) {
    res.json({ error: "Unable to fetch the student with that id." });
  }
});

route.post("/", async (req, res) => {
  const student = req.body;

  try {
    await db("students").insert(student);
    res.json({ message: "A new student has been created." });
  } catch (err) {
    res.json({ error: "Unable to add a new student." });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const student = await db("students")
      .where({ id })
      .first();
    !student
      ? res
          .status(404)
          .json({ error: "The student with this id does not exist." })
      : await db("students")
          .where({ id })
          .del();

    res.json({ message: "The student has been deleted." });
  } catch (err) {
    res.json({ error: "Unable to delete the student." });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const student = await db("students")
      .where({ id })
      .first();
    !student
      ? res
          .status(404)
          .json({ error: "The student with this id does not exist." })
      : await db("students")
          .where({ id })
          .update(changes);

    res.json({ message: "The student has been updated." });
  } catch (err) {
    res.json({ error: "Unable to update the student." });
  }
});

module.exports = route;
