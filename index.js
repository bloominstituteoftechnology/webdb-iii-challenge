const express = require('express');
const server = express();
const PORT = process.env.PORT || 5000;
server.use(express.json());
const db = knex(dbconfig.development)

server.post('/api/cohorts', (req, res) => {
  const student = req.body;
  db('cohorts').insert(student)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json({ message: "unable to add cohort" })
    })

})

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(rows => res.json(rows))
    .catch(err => { res.status(500).json({ message: 'unable to find any cohorts' }) })
});

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts').where('id', id)
    .then(cohorts => res.json(cohort))
    .catch(err => res.status(500).json({ message: "failed to fetch that cohort" }))
});

server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;
  db('students').where('cohort_id', id)
    .then(students => res.json(students))
    .catch(err => res.status(500).json({ message: 'failed to get students from that cohort' }))
})

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const cohort = req.body;
  db('cohorts').where('id', id).update(cohort)
    .then(rowCount => {
      res.json(rowCount)
    })
    .catch(err => { res.status(500).json({ message: 'unable to update cohort name' }) })
})

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts').where('id', id)
    .del()
    .then(rowsDeleted => res.status(201).json(rowsDeleted))
})
  .catch(err => { res.status(500).json({ message: "unable to delete this cohort" }) });



server.listen(PORT, () => {
  console.log(`server is up and running on ${PORT}`)
})