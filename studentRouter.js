const express = require("express");
const knex = require("knex");

const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await db("students");
    if (students) {
      res.status(200).json(students);
    }
  } catch (error) {
    res.status(500).json({ message: `Students could not be found ${error}.` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await db("student")
      .where({ id })
      .first();
    if (student) {
      res.status(200).json(student);
    } else {
      res
        .status(404)
        .json({ message: "Student with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `tudent request failed ${error}.` });
  }
});

router.post("/", async (req, res) => {
  const student = req.body;
  if (!student.name) {
    res.status(400).json({ message: "Please enter a valid student name." });
  } else {
    try {
      const [id] = await db("students").insert(student);
      if (id) {
        const newStudent = await db("students")
          .where({ id })
          .first();
        res.status(201).json(newStudent);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your student could not be posted ${error}.` });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await db("students")
      .where({ id })
      .first();
    if (student) {
      const deleted = await db("students")
        .where({ id })
        .del();
      if (deleted) {
        res.status(200).json(student);
      }
    } else {
      res
        .status(404)
        .json({ message: "The student with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: `The student's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newStudent = req.body;

  if (!newStudent.name) {
    res.status(400).json({ message: "Please enter a valid student name." });
  } else {
    try {
      const editedStudent = await db("students")
        .where({ id })
        .update(newStudent);
      if (editedStudent) {
        const student = await db("students")
          .where({ id })
          .first();
        res.status(200).json(student);
      } else {
        res.status(404).json({
          message: "The student with the specified ID does not exist."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `The student's information could not be modified: ${error}.`
      });
    }
  }
});

module.exports = router;
