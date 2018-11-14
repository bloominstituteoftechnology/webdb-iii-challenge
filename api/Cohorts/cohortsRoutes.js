// cohortsRoutes.js
const express = require('express')
const knex = require('knex')

const knexConfig = require('../../knexfile.js')
const db = knex(knexConfig.development)

const router = express.Router();

const getAllCohorts = (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(error)
    });
}

const getCohort = (req, res) => {
  const { id } = req.params

  db('cohorts')
    .where('id', id)
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(error)
    });
}

const addCohort = (req, res) => {
  const { name } = req.body
  console.log(name)

  db('cohorts')
    .insert({ name })
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(error)
    });
}

const updateCohort = (req, res) => {
  const changes = req.body
  const { id } = req.params

  db('cohorts')
    .where('id', id)
    .update(changes)
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(error)
    });
}

const deleteCohort = (req, res) => {
  const changes = req.body
  const { id } = req.params

  db('cohorts')
    .where('id', id)
    .del()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(error)
    });
}

const echo = (req, res) => {
  res.status(200).json({
    message: 'hey this endpoint work!',
    params: req.params,
    query: (req.query ? req.query : ''),
    body: req.body
  });
}

router.post('/', addCohort)
router.get('/', getAllCohorts)
router.get('/:id', getCohort)
router.put('/:id', updateCohort)
router.delete('/:id', deleteCohort)

module.exports = router;
