const express = require('express');
const router = express.Router();
const knex = require('knex');

//const server = express();
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

/* ---------- GET /api/students---------- */
// SELECT * FROM students
router.get( '/', (req, res) => {
  db('students')
    .then( (rows) => {
      res.json(rows);
    })
    .catch( (err) => {
      res.status(500).json({ error: "Could not get list of students. "});
    });
});


/* ---------- GET /api/students/:id ---------- */
// SELECT * FROM students WHERE id={id}
router.get( '/:id', (req, res) => {
  const {id} = req.params;

  db('students').where('id', id)
    .then( (rows) => {
      res.json(rows);
    })
    .catch( (err) => {
      res.status(500).json({ error: "Could not get student." });
    });
  // end-db
});


/* ---------- POST /api/students ---------- */
// INSERT INTO students (name) VALUES (body);
router.post('/', (req,res) => {
  const studentData = req.body;

  //Check for empty name & cohort_id:
  if( !studentData.name || !studentData.cohort_id ){
    res.status(400).json({ error: "Please provide the name and cohort of the student." });
  } else {
    db('students').insert(studentData)
      .then( (newId) => {
        res.status(201).json(newId);
      })
      .catch( (err) => {
        res.status(500).json({ error: "Could not add new student." });
      });
    // end-db
  }
});


/* ---------- PUT /api/students/:id ---------- */
// UPDATE students SET name={name} WHERE id={id};
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


/* ---------- DELETE /api/students/:id ---------- */



module.exports = router;