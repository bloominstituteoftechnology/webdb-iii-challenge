const express = require('express');
const router = express.Router();
const db = require('../helpers/cohortHelpers');

router.post('/', (req, res) => {
  const cohort = req.body;
  if(cohort.name.length !== 0) {
    db.insert(cohort)
      .then(cohort => {
        res
          .status(201)
          .json(cohort.id)
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "There was a problem adding that cohort to the database...", error})
      })
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please give the cohort a name!" })
  }
})

router.get('/', (req, res) => {
  db.find()
    .then(cohorts => {
      res
        .status(200)
        .json(cohorts)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Sorry, we are having trouble fetching the list of cohorts.", err })
    })
})

module.exports = router;