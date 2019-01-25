const express = require('express')
const knex = require('knex')
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)
const server = express()
const PORT = 5222

server.use(express.json())

server.post('/api/cohorts', (req, res) => {
  const cohort = req.body
  if (cohort.name) {
    db('cohorts')
      .insert(cohort)
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: 'Failed to insert the cohort into the database' })
      })
  } else {
    res.status(400).json({ error: 'Please provide a name for the cohort' })
  }
})

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(rows => {
      res.json(rows)
    })
    .catch(() => {
      res.status(500).json({
        error:
          'Information for this table could not be retrieved from the database.'
      })
    })
})

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params
  db('cohorts')
    .where('id', id)
    .then(cohorts => {
      res.json(cohorts)
    })
    .catch(() => {
      res
        .status(500)
        .json({
          error: 'Failed to find a cohort with this id in the database.'
        })
    })
})

server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params
  db('students')
    .where('cohort_id', id)
    .then(students => {
      if (students.length) {
        res.json(students)
      } else {
        res.status(400).json({ error: 'There are no students in this cohort' })
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'Failed to find these students in this cohort.' })
    })
})

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params
  const cohort = req.body
  db('cohorts')
    .where('id', id)
    .update(cohort)
    .then(rowCount => {
      res.status(200).json(rowCount)
    })
    .catch(() => {
      res.status(500).json({ error: 'Failed to update this cohort.' })
    })
})

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params
  db('cohorts')
    .where({ id })
    .del() //also can use (id : id) or ('id', id)
    .then(count => {
      if (count) {
        res.json({
          message: 'The cohort was successfully deleted from the database.'
        })
      } else {
        res
          .status(404)
          .json({
            error:
              'The cohort with the specified id does not exist in the database.'
          })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The cohort could not be removed from the database.' })
    })
})

//students endpoints

server.post('/api/students', (req, res) => {
  const student = req.body
  if (student.name && student.cohort_id) {
    db('students')
      .insert(student)
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: 'Failed to insert the student into the database' })
      })
  } else {
    res
      .status(400)
      .json({ error: 'Please provide a name and cohort id for the student' })
  }
})

server.get('/api/students', (req, res) => {
  db('students')
    .then(rows => {
      res.json(rows)
    })
    .catch(() => {
      res.status(500).json({
        error:
          'Information for this table could not be retrieved from the database.'
      })
    })
})

server.get('/api/students/:id', (req, res) => {
  const { id } = req.params
  db('students')
    .where('id', id)
    .then(rows => {
      res.json(rows)
    })
    .catch(() => {
      res
        .status(500)
        .json({
          error: 'Failed to find a student with this id in the database.'
        })
    })
})

server.put('/api/students/:id', (req, res) => {
  const { id } = req.params
  const student = req.body
  db('students')
    .where('id', id)
    .update(student)
    .then(rowCount => {
      res.status(200).json(rowCount)
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: 'Failed to update informtation about this student.' })
    })
})

server.delete('/api/students/:id', (req, res) => {
  const { id } = req.params
  db('students')
    .where({ id })
    .del() //also can use (id : id) or ('id', id)
    .then(count => {
      if (count) {
        res.json({
          message: 'The student was successfully deleted from the database.'
        })
      } else {
        res
          .status(404)
          .json({
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

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
