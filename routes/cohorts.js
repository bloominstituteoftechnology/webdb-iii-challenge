const express = require('express');
const router = express.Router();
const knex = require('knex');

//const server = express();
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

/* ---------- GET /api/cohorts---------- */
// SELECT * FROM cohorts
router.get( '/', (req, res) => {
  db('cohorts')
    .then( (rows) => {
      res.json(rows);
    })
    .catch( (err) => {
      res.status(500).json({ error: "Could not get list of cohorts. "});
    });
});


/* ---------- GET /api/cohorts/:id ---------- */
// SELECT * FROM cohorts WHERE id={id}
router.get( '/:id', (req, res) => {
  const {id} = req.params;

  db('cohorts').where('id', id)
    .then( (rows) => {
      res.json(rows);
    })
    .catch( (err) => {
      res.status(500).json({ error: "Could not get cohort." });
    });
  // end-db
});


/* ---------- GET /api/cohorts/:id/students ---------- */
// SELECT * FROM students WHERE cohort_id={id};
router.get( '/:id/students', (req, res) => {
  const {id} = req.params;

  db('students').where('cohort_id', id)
    .then( (rows) => {
      res.json(rows);
    })
    .catch( (err) => {
      res.status(500).json({ error: "Could not get students from that cohort." });
    });
  // end-db
});

/* ---------- POST /api/cohorts ---------- */
// INSERT INTO cohorts (name) VALUES (body);
router.post('/', (req,res) => {
  const cohortData = req.body;

  //Check for empty name:
  if( !cohortData.name ){
    res.status(400).json({ error: "Please provide the name of the cohort." });
  } else {
    db('cohorts').insert(cohortData)
      .then( (newId) => {
        res.status(201).json(newId);
      })
      .catch( (err) => {
        res.status(500).json({ error: "Could not add new cohort." });
      });
    // end-db
  }
});


/* ---------- PUT /api/cohorts/:id ---------- */
// UPDATE cohorts SET name={name} WHERE id={id};
router.put('/:id', (req,res) => {
  const {id} = req.params;
  const cohortData = req.body;

  if( cohortData.name ){
    db('cohorts').where('id', id).update(cohortData)
      .then( (rowCount) => {
        res.json(rowCount);
      })
      .catch( (err) => {
        res.status(500).json({ error: "Could not update cohort." });
      });
    // end-db
  } else {
    res.status(400).json({ error: "Please provide the name of the cohort."});
  }
});


/* ---------- DELETE /api/cohorts/:id ---------- */
// DELETE FROM cohorts WHERE id={id};
router.delete('/:id', (req,res) => {
  const {id} = req.params;

  db('cohorts').where('id', id).del()
    .then( (rowCount) => {
      res.status(201).json(rowCount);
    })
    .catch( (err) => {
      res.status(500).json({ error: "Could not delete cohort." });
    });
});


module.exports = router;