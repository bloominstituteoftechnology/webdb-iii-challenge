const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

//middleware
function checkIfCohortExists (req, res, next) {
    const {id} = req.params;
    db('cohorts').where({ id: id })
    .then(cohort => {
        if (cohort.length === 0) {
        res.status(404).json({ message: "The cohort with the specified ID does not exist." });
        } else next();
    })
    .catch(err => res.status(500).json(err));
}

function VerifyCohort (req, res, next) {
    const id = req.body.cohort_id;
    db('cohorts').where({ id: id })
    .then(cohort => {
        if (cohort.length === 0) {
        res.status(404).json({ message: "Please enter a valid cohort ID." });
        } else next();
    })
    .catch(err => res.status(500).json(err));
}

//cohort endpoints
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (!cohort.name) {
        res.status(400).json({ error: "Please provide a name for the cohort." })
    } else
        db.insert(cohort)
        .into('cohorts')
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "There was an error saving the cohort." }))
})
    
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json(err));
})

server.get('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where({ id: id })
    .then(cohort => {
        if (cohort.length === 0) {
        res.status(404).json({ message: "The cohort with the specified ID does not exist." });
        } else 
        res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
})

server.get('/api/cohorts/:id/students', checkIfCohortExists, (req, res) => {
    const {id} = req.params;
    db('students')
      .join('cohorts', 'cohorts.id', 'students.cohort_id')
      .select('students.id', 'students.name', 'cohorts.name as Cohort')
      .where('students.cohort_id', id)
    .then(students => {
        if (students.length === 0) {
        res.status(404).json({ message: "This cohort does not have any students." });
        } else 
        res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
})

server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where({ id: id }).del()
    .then(count => {
        if (count) {
        res.status(204).end();
        } else {
        res.status(404).json({ message: "The cohort with the specified ID does not exist." });
        }
    })
    .catch(err => res.status(500).json(err));
})

server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    const cohort = req.body;
    if (!cohort.name) {
        res.status(400).json({ error: "Please provide a name for the cohort." })
    } else
        db('cohorts').where({ id: id }).update(cohort)
        .then(count => {
        if (count) {
            res.status(200).json({ message: "The cohort was successfully updated." });
        } else {
            res.status(404).json({ message: "The cohort with the specified ID does not exist." });
        }
        })
        .catch(err => res.status(500).json(err));
})


//student endpoints
server.post('/api/students', VerifyCohort, (req, res) => {
    const student = req.body;
    if (!student.name) {
        res.status(400).json({ error: "Please provide a name for the student." })
    } else
        db.insert(student)
        .into('students')
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "There was an error saving the student." }))
})
    
server.get('/api/students', (req, res) => {
    db('students')
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => res.status(500).json(err));
})

server.get('/api/students/:id', (req, res) => {
    const {id} = req.params;
    db('students').where({ id: id })
    .then(student => {
        if (student.length === 0) {
        res.status(404).json({ message: "The student with the specified ID does not exist." });
        } else 
        res.status(200).json(student);
    })
    .catch(err => res.status(500).json(err));
})

server.delete('/api/students/:id', (req, res) => {
    const {id} = req.params;
    db('students').where({ id: id }).del()
    .then(count => {
        if (count) {
        res.status(204).end();
        } else {
        res.status(404).json({ message: "The student with the specified ID does not exist." });
        }
    })
    .catch(err => res.status(500).json(err));
})

server.put('/api/students/:id', VerifyCohort, (req, res) => {
    const {id} = req.params;
    const student = req.body;
    if (!student.name) {
        res.status(400).json({ error: "Please provide a name for the student." })
    } else
        db('students').where({ id: id }).update(student)
        .then(count => {
        if (count) {
            res.status(200).json({ message: "The student was successfully updated." });
        } else {
            res.status(404).json({ message: "The student with the specified ID does not exist." });
        }
        })
        .catch(err => res.status(500).json(err));
})

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
