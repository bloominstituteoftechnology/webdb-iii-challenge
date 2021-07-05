const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ message: " error: 'The cohorts could not be retrieved'", error: error });
  }
});

server.get('/api/students', async (req, res) => {
  try {
    const students = await db('students');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: " error: 'The students could not be retrieved'", error: error });
  }
});

server.get('/api/cohorts/:cohortId', async (req, res) => {
  const { cohortId } = req.params;

  try {
    const cohort = await db('cohorts').where({ id: cohortId });
    {
      cohort[0]
        ? res.status(200).json({ cohort })
        : res.status(404).json({ error: 'The cohort with that ID does not exist.' });
    }
  } catch (error) {
    console.log('The error is: ', error);
    res.status(500).json(error);
  }
});

server.get('/api/students/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await db('students')
      .select('students.id', 'students.name', 'cohorts.name as cohort')
      .join('cohorts', 'students.cohort_id', '=', 'cohorts.id')
      .where({ 'students.id': studentId });
    {
      student[0]
        ? res.status(200).json(student[0])
        : res.status(404).json({ error: 'The student with that ID does not exist.' });
    }
  } catch (error) {
    console.log('The error is: ', error);
    res.status(500).json(error);
  }
});

//:variable needs to match const { variable } = req.params
server.get('/api/cohorts/:id/students', async (req, res) => {
  const { id } = req.params;
  console.log('the cohortID is: ', id);

  try {
    const cohortStudents = await db('students').where({ cohort_id: id });
    {
      cohortStudents[0]
        ? res.status(200).json({ cohortStudents })
        : res.status(404).json({ error: 'The cohort with that ID does not exist.' });
    }
  } catch (error) {
    console.log('The error is: ', error);
    res.status(500).json(error);
  }
});

server.post('/api/cohorts', async (req, res) => {
  const cohortData = req.body;
  if (!cohortData.name) {
    res.status(400).json({ errorMessage: 'Please provide a name for your cohort' });
  } else {
    try {
      const newCohortId = await db('cohorts').insert(cohortData);
      res.status(201).json(newCohortId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error inserting cohort', error });
    }
  }
});

server.post('/api/students', async (req, res) => {
  const studentData = req.body;
  if (!studentData.name) {
    res.status(400).json({ errorMessage: 'Please provide a name for your student' });
  } else {
    try {
      const newStudentId = await db('students').insert(studentData);
      res.status(201).json(newStudentId);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error inserting student', error });
    }
  }
});

server.delete('/api/cohorts/:cohortId', async (req, res) => {
  const { cohortId } = req.params;

  try {
    const deletedCohortCount = await db('cohorts')
      .where({ id: cohortId })
      .del();
    {
      deletedCohortCount === 0
        ? res.status(404).json({ message: 'The cohort with the specified ID does not exist.' })
        : res.status(200).json({ deletedCohortCount });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.delete('/api/students/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const deletedStudentCount = await db('students')
      .where({ id: studentId })
      .del();
    {
      deletedStudentCount === 0
        ? res.status(404).json({ message: 'The student with the specified ID does not exist.' })
        : res.status(200).json({ deletedStudentCount });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.put('/api/cohorts/:cohortId', async (req, res) => {
  const changes = req.body;
  const { cohortId } = req.params;

  if (!changes.name) {
    res.status(400).json({ errorMessage: 'Please provide a name for the cohort.' });
  }

  try {
    const updatedCohortCount = await db('cohorts')
      .where({ id: cohortId })
      .update(changes);
    {
      updatedCohortCount === 0
        ? res.status(404).json({ message: 'The cohort with the specified ID does not exist.' })
        : res.status(200).json({ updatedCohortCount });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.put('/api/students/:studentId', async (req, res) => {
  const changes = req.body;
  const { studentId } = req.params;

  if (!changes.name) {
    res.status(400).json({ errorMessage: 'Please provide a name for the student.' });
  }

  try {
    const updatedStudentCount = await db('students')
      .where({ id: studentId })
      .update(changes);
    {
      updatedStudentCount === 0
        ? res.status(404).json({ message: 'The student with the specified ID does not exist.' })
        : res.status(200).json({ updatedStudentCount });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
