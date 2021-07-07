const express = require("express");
const studentsDb = require("../data/models/studentsDb");

const router = express.Router();

//Routes
router.post("/", (req, res) => {
  const newStudent = req.body;
  studentsDb
    .insert(newStudent)
    .then(id => {
      if (id) {
        res.status(201).json({ message: "student was added succesfully" });
      } else
        res.status(500).json({ error: "There was an error adding the record" });
    })
    .catch(err => res.status(500).json(err));
});

router.get("/", (req, res) => {
  studentsDb
    .find()
    .then(students => res.json(students))
    .catch(err => res.json(err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: "There was an error with the request" });
  }

  studentsDb
    .findById(id)
    .then(student => {
      if (!student || student === undefined) {
        res.status(404).json({ message: "student was not found" });
      } else res.status(200).json(student);
    })
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedStudent = req.body;
  if (!id || !updatedStudent) {
    res.status(400).json({ message: "Bad request" });
  }
  studentsDb
    .update(id, updatedStudent)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({ message: "student was updated" });
      } else
        res
          .status(500)
          .json({ message: "There was an error updating the student" });
    })
    .catch(err => res.status(500).json(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ message: "Bad request" });
  }
  studentsDb
    .remove(id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({ message: "student was removed" });
      } else
        res
          .status(500)
          .json({ message: "There was an error removing the student" });
    })
    .catch(err => json.stauts(500).json(err));
});

module.exports = router;
