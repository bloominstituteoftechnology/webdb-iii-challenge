const express = require("express");

const db = require("./cohortsModel.js");

const router = express.Router();

//GET STUDENTS
router.get("/:id/students", (req, res) => {
  let { id } = req.params;

  db.getStudentsByID(id)
    .then(students => {
      if (!students || students.length < 1) {
        res.status(404).send("No students with that id");
      } else {
        res.status(200).json(students);
      }
    })
    .catch(err => res.status(500).json(err));
});

//GET ALL COHORTS
router.get("/", (req, res) => {
  db.find()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

//MODIFY COHORT
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let changes = req.body;

  db.update(id, changes)
    .then(response => {
      res.status(200).json(changes)
    })
    .catch(err => res.status(500).json(err));
});

//GET ONE COHORT
router.get("/:id", (req, res) => {
  let { id } = req.params;

  db.findById(id)
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
});

//ADD COHORT
router.post("/", (req, res) => {
  let cohort = req.body;

  db.add(cohort)
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
});

//DELETE COHORT
router.delete("/:id", (req, res) => {
  let { id } = req.params;

  db.remove(id)

    .then(count => {
      console.log(id);
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to delete" });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(err => res.status(500).json(err));
});
module.exports = router;
