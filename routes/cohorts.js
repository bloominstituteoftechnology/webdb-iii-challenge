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

  if(!id){
    res.status(400).json({ error: "No id number found!"});
  }
  
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



/* ---------- POST /api/cohorts ---------- */



/* ---------- PUT /api/cohorts/:id ---------- */



/* ---------- DELETE /api/cohorts/:id ---------- */



module.exports = router;