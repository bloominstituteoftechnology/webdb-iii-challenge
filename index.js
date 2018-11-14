const express = require('express');

const db = require('./data/cohortsDb');

const server = express();
const port = 3300;

server.use(express.json());

// error helper
const errorHelper = (res, code, errMessage, err = 'ERROR') => {
  return res.status(code).json({ message: errMessage, err });
}

// Endpoints

// test API
server.get('/', (_, res) => {
  res.status(200).json({ api: "running..." });
});

// GET all cohorts
server.get('/api/cohorts', (_, res) => {
  db.get()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => errorHelper(res, 500, 'Error fetching', err));
});

// GET cohort by id
server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db.get(id)
    .then(cohort => {
      // cohort returns undefined || object
      if (!cohort) return errorHelper(res, 404, `ID: ${id} Not Found`);
      res.status(200).json(cohort);
    })
    .catch(err => errorHelper(res, 500, 'Error fetching', err));
});

// GET cohort's students
server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;

  db.getCohortStudents(id)
    .then(students => {
      console.log('students', students);
      if (students.length === 0) return errorHelper(res, 404, 'Student(s) not Found');
      res.status(200).json(students);
    })
    .catch(err => errorHelper(res, 500, 'Error fetching', err));
});

// POST a new cohort
server.post('/api/cohorts', (req, res) => {
  const name = req.body;

  db.insert(name)
    .then(id => {
      res.status(201).json({ message: `Cohort with id ${id} added` });
    })
    .catch(err => errorHelper(res, 500, 'Error Posting', err));
});

// UPDATE existing cohort
server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body;

  db.update(id, name)
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} cohort updated` });
      errorHelper(res, 404, `ID ${id} not found`);
    })
    .catch(err => errorHelper(res, 500, 'Error Updating', err));
});

// DELETE existing cohort
server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} cohort deleted` });
      errorHelper(res, 404, `ID ${id} not found`);
    })
    .catch(err => errorHelper(res, 500, 'Error Deleting', err));
});

server.listen(port, () => console.log(`Listening on port: ${port}`));
