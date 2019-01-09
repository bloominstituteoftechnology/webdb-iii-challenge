const studentDb = require("../data/helpers/studentDb");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  studentDb
    .get()
    .then(students => {
      students[0]
        ? res.json(students)
        : res
            .status(400)
            .json({ error: "there are currently no students in our directory" });
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve students" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  studentDb
    .get(id)
    .then(student => {
      if (student[0]) {
        res.json(student);
      } else {
        res.status(404).json({ error: "student does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "student could not be retrieved." });
    });
});

module.exports = router

