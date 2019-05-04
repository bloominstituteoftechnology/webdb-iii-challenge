const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ api: 'up' });
  });

// add a new cohort
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
  
    db('cohorts')
      .insert(cohort)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Cannot post a new cohort" });
      });
});

// get all cohorts
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
      .then(cohort => res.status(200).json(cohort))
      .catch(err => res.status(500).json(err));
});

//get cohort by id
server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts').where({ id }).then(cohort => {
      if (cohort.length !== 0) {
        res.status(200).json(cohort)
      } else {
        res.status(404).json({ message: "The cohort with the specified id does not exist." });
      }
    }).catch(error => {
      res.status(500).json({ error: "Cant get cohort data." });
    });
});

// get students by cohort id
server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;
    
    db('students')
      .where({ cohort_id: id })
      .then(student => {
            res.status(200).json(student)
      })
      .catch(error => res.status(500).json(error));
})

// change cohort by id
server.put('/api/cohorts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('cohorts')
      .where({ id })
      .update(changes)
      .then(cohort => {
        res.status(200).json({ cohort })
      })
      .catch(error => res.status(500).json(error));
})

// delete zoo by id
server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
  
    db('cohorts')
      .where({ id })
      .del()
      .then(cohort => {
        res.status(200).json({ cohort })
      })
      .catch(error => res.status(500).json(error));
})


// Students

// add a new student
server.post('/api/students', (req, res) => {
    const student = req.body;
  
    db('students')
      .insert(student)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Cannot post a new student" });
      });
});

// get all students
server.get('/api/students', (req, res) => {
    db('students')
      .then(student => res.status(200).json(student))
      .catch(err => res.status(500).json(err));
});

//get student by id
server.get('/api/students/:id', (req, res) => {
    const { id } = req.params;

    db('students').where({ id }).then(student => {
      if (student.length !== 0) {
        res.status(200).json(student)
      } else {
        res.status(404).json({ message: "The student with the specified id does not exist." });
      }
    }).catch(error => {
      res.status(500).json({ error: "Cant get student data." });
    });
});

// change student by id
server.put('/api/students/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('students')
      .where({ id })
      .update(changes)
      .then(student => {
        res.status(200).json({ student })
      })
      .catch(error => res.status(500).json(error));
})

// delete student by id
server.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
  
    db('students')
      .where({ id })
      .del()
      .then(student => {
        res.status(200).json({ student })
      })
      .catch(error => res.status(500).json(error));
})

// get students by cohort id & student id
server.get('/api/cohorts/:cohortid/students/:studentid', (req, res) => {
    const { cohortid } = req.params;
    const { studentid } = req.params;
    
    db('students')
      .where({ cohort_id: cohortid, id: studentid })
      .then(student => {
            res.status(200).json(student)
      })
      .catch(error => res.status(500).json(error));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});