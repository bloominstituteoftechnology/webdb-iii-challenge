const knex = require('knex')
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)



const controllersCohorts = {
  addCohort (req, res, next) {
    if (!req.body.name || req.body.length <= 0) {
      next(new Error('EMPTY BODY'))
    }
    const cohortName = req.body
    db('cohorts')
      .insert(cohortName)
      .then((id) => res.status(201).json(id))
      .catch(next)
  },
  getAllCohortStudents (req, res, next) {
    db('students')
      .select()
      .where('cohort_id', req.params.id)
      .then((students) => {
        if (!students.length) {
          next(new Error('ID NOT FOUND'))
        }
        res.status(200).json(students)
      })
      .catch(next)
  },
  getAllCohorts (req, res, next) {
    db('cohorts').then((cohorts) => res.status(200).json(cohorts)).catch(next)
  },
  getSingleCohort (req, res, next) {
    db('cohorts')
      .where('id', req.params.id)
      .then((cohort) => {
        if (!cohort.length) {
          next(new Error('ID NOT FOUND'))
        }
        res.status(200).json(cohort)
      })
      .catch(next)
  },
  updateCohort (req, res, next) {
    if (req.body.name.length <= 0) {
      next(new Error('needs update content'))
    }
    db('cohorts')
      .where('id', req.params.id)
      .update(req.body)
      .then((count) => {
        console.log(count)
        if (count <= 0) {
          next(new Error('ID NOT FOUND'))
        }
        res.status(200).json(count)
      })
      .catch(next)
  },
  deleteCohort (req, res, next) {
    db('cohorts')
      .where('id', req.params.id)
      .del()
      .then((count) => {
        if (count <= 0) {
          next(new Error('ID NOT FOUND'))
        }
        res.status(200).json(count)
      })
      .catch(next)
  }
}
module.exports = controllersCohorts
