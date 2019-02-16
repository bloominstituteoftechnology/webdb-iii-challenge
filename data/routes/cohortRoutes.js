const express = require('express')
const knex = require('knex')
const knexConfig = require('../../knexfile')
const db = knex(knexConfig.development)
const router = express.Router()

router.get('/', (req, res) => {
    db('cohorts')
      .then(cohorts => {
        res.json(cohorts)
      })
      .catch(() => {
        res.status(500).json({
          error:
            'Information for this table could not be retrieved from the database.'
        })
      })
  })

router.post('/api/cohorts', (req, res) => {
    const cohort = req.body
    if (cohort.name) {
        db('cohorts')
        .insert(cohort)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(() => {
            res.status.json({ error: 'Failed to insert the cohort into the DB.'})
        })
    } else {
        res.status(400).json({ error: 'Please include a name for the cohort'})
    }
})


module.exports = router;