const studentDb = require("../data/helpers/studentDb");
const cohortDb = require("../data/helpers/cohortDb");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  studentDb
    .get()
    .then(students => {
      students[0]
        ? res.json(students)
        : res.status(400).json({
            error: "there are currently no students in our directory"
          });
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

router.post("/", (req, res) => {
  const newStudent = req.body;
  if (!newStudent.name || newStudent.name === "") {
    res.status(400).json({ error: "student name is required" });
  } else if (typeof newStudent.name !== "string") {
    res.status(400).json({ error: "student name must be a string" });
  } else if (
    !newStudent.cohort_id ||
    typeof newStudent.cohort_id !== "number"
  ) {
    res
      .status(400)
      .json({ error: "cohort id is required and must be a number" });
  } else {
    cohortDb.get(newStudent.cohort_id).then(cohort => {
      if (cohort[0]) {
        studentDb
          .insert(newStudent)
          .then(id => res.status(201).json(id))
          .catch(err =>
            res.status(500).json({ error: "trouble adding student" })
          );
      } else {
        res
          .status(400)
          .json({ error: "cohort id must correspond to an existing cohort" });
      }
    });
  }
});

router.put("/:id", (req, res) => {
  const updatedStudent = req.body;
  const { id } = req.params;
  studentDb.get(id).then(student => {
    if (student[0]) {
      cohortDb
        .get(updatedStudent.cohort_id)
        .then(cohort => {
          if (cohort[0]) {
            if (!updatedStudent.name || updatedStudent.name === "") {
              res.status(400).json({ error: "student name is required" });
            } else if (typeof updatedStudent.name !== "string") {
              res.status(400).json({ error: "student name must be a string" });
            } else {
              studentDb
                .update(id, updatedStudent)
                .then(rows => {
                  studentDb
                    .get(id)
                    .then(student => res.status(201).json(student))
                    .catch(err =>
                      res
                        .status(500)
                        .json({ error: "trouble retrieving updated student" })
                    );
                })
                .catch(err =>
                  res.status(500).json({ error: "trouble updating student" })
                );
            }
          } else {
            res.status(404).json({ error: "student does not exist" });
          }
        })
        .catch(err =>
          res
            .status(500)
            .json({ error: "trouble retrieving student to update" })
        );
    } else {
      res
        .status(400)
        .json({ error: "cohort_id must correspond to existing cohort" });
    }
  });

  router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await studentDb.get(id);

  studentDb
    .get(id)
    .then(student => {
      if (student[0]) {
        studentDb
          .remove(id)
          .then(rows => res.status(201).json(deleted))
          .catch(err =>
            res.status(500).json({ error: "trouble deleting student" })
          );
      } else {
        res.status(404).json({ error: "student does not exist" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "trouble retrieving student to be deleted" })
    );
});

});

module.exports = router;
