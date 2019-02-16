const express = require("express");
const knex = require("knex");
const knexConfig = require("../../knexfile");
const db = knex(knexConfig.development);
const router = express.Router();

router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.json(cohorts);
    })
    .catch(() => {
      res.status(500).json({ error: "The table could not be found in the DB." });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    db('cohorts')
    .where({ id })
    .then(cohorts => {
        res.json(cohorts)
    })
    .catch(() => {
        res.status(500).json({ error: 'The cohort with that ID does not exist in the DB.'})
    })
});

router.post("/", (req, res) => {
  const cohort = req.body;
  if (cohort.name) {
    db("cohorts")
      .insert(cohort)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(() => {
        res.status.json({ error: "Failed to insert the cohort into the DB." });
      });
  } else {
    res.status(400).json({ error: "Please include a name for the cohort" });
  }
});

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
  
  
module.exports = router;
