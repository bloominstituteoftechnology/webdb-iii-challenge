const express = require("express");
const studentDb = require("../../data/helpers/studentDb.js");
const router = express.Router();

router.get("/", (req, res) => {
  studentDb
    .get()
    .then(students => {
      res.json(students);
    })
    .catch(err => res.send({ error: "The students could not be retrieved." }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  studentDb
    .get(id)
    .then(student => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({
          message: "The student with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ error: "The student couldn't be retrieved" });
    });
});

router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.cohort_id) {
    return res
      .status(400)
      .json({ message: "Please provide name and cohort id for student." });
  }
  try {
    let data = await studentDb.insert(req.body);
    return res.status(201).json({
      id: data.id,
      name: req.body.name,
      cohort_id: req.body.cohort_id
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the student to the database"
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  studentDb.get(id).then(student => {
    if (!student) {
      res
        .status(404)
        .json({ message: "The student with the specified ID does not exist." });
    } else {
      studentDb
        .remove(id)
        .then(student => {
          res.status(200).json({ message: `Student was successfully deleted` });
        })
        .catch(err => {
          console.log("Error: ", err);
          res.status(500).json({ error: "The student could not be removed" });
        });
    }
  });
});

//updates the student and returns the updated student object
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, cohort_id } = req.body;
  const student = { name, cohort_id };

  if (!req.body.name || !req.body.cohort_id) {
    return res
      .status(400)
      .json({ message: "Please provide name and cohort id for student." });
  } else {
    studentDb.get(id).then(student => {
      if (!student) {
        return res.status(404).json({
          message: "The student with the specified ID does not exist."
        });
      }
    });
  }

  studentDb
    .update(id, student)
    .then(res.status(200))
    .catch(err => {
      console.log("Error: ", err);
      res
        .status(500)
        .json({ error: "The student information could not be modified." });
    });

  studentDb.get(id).then(student => {
    if (student) {
      res.status(200).json(student);
    }
  });
});

module.exports = router;
