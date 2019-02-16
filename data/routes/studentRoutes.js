const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);

router.post("/", (req, res) => {
  const student = req.body;
  if (student.name && student.cohort_id) {
    db("students")
      .insert(student)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "Failed to insert the student into the database" });
      });
  } else {
    res
      .status(400)
      .json({ error: "Please provide a name and cohort id for the student" });
  }
});

router.get("/", (req, res) => {
  db("students")
    .then(students => {
      res.json(students);
    })
    .catch(() => {
      res.status(500).json({
        error:
          "Information for this table could not be retrieved from the database."
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("students")
    .where({ id })
    .then(students => {
      res.json(students);
    })
    .catch(() => {
      res
        .status(500)
        .json({
          error: "The student with that ID does not exist within the DB."
        });
    });
});

router.get("/:id/students", (req, res) => {
    const { id } = req.params
    db("students")
    .where("cohort_id", id)
    .then(students => {
        if (students.length) {
            res.json(students)
        } else {
            res.status(400).json({ error: 'There are no students in this cohort'})
        }
    })
    .catch(() => {
        res.status(500).json({ error: 'Failed to find the student by that ID in this cohort'})
    })
});

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const studentData = req.body;
  
    if( studentData.name && studentData.cohort_id ){
      db('students').where('id', id).update(studentData)
        .then( (rowCount) => {
          res.json(rowCount);
        })
        .catch( (err) => {
          res.status(500).json({ error: "Could not update student." });
        });
      // end-db
    } else {
      res.status(400).json({ error: "Please provide the name & cohort of the student."});
    }
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('students')
      .where({ id })
      .del() 
      .then(count => {
        if (count) {
          res.json({
            message: 'The student was successfully deleted from the database.'
          })
        } else {
          res.status(404).json({
            error:
              'The student with the specified id does not exist in the database.'
          })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: 'The student could not be removed from the database.' })
      })
  })


module.exports = router;
