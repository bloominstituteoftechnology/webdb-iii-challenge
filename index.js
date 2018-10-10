const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.get('/', (req, res) => {
    res.send('API Running?');
});

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: 'The cohort name is required, please enter the name and try again.' });
        return;
    }

    db.insert(cohort)
        .into('cohorts')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(500).json(err));
});

// get all the cohorts
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => res.status(500).json(err));
});

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts')
        .where('id', '=', id)
        .then(cohort => {
            if (!cohort) {
                res.status(404).json({ message: 'The cohort with the specified ID does not exist.' });
                return;
            }
            res.status(200).json(cohort);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: 'The cohort information could not be retrieved.' })
        })
});

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;

    db('students')
        .join('cohorts', 'cohorts.id', 'students.cohort_id')
        .select('students.id', 'students.name', 'cohorts.name as cohortOf')
        .where('students.cohort_id', id)
        .then(cohort => {
            if (!cohort) {
                res.status(404).json({ message: 'The cohort with the specified ID does not exist.' });
                return;
            }
            res.status(200).json(cohort);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: 'The cohort information could not be retrieved.' })
        })
});

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts')
        .where({ id }) 
        .del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.put('/api/cohorts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    db('cohorts')
        .where({ id: id}) 
        .update(changes)
        .then(count => {
            
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});



server.post('/api/students', (req, res) => {
    const student = req.body;
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ error: 'Student name is required, please enter  name and try again.' });
        return;
    }

 
    db.insert(student)
        .into('students')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => res.status(500).json(err));
});


server.get('/api/students', (req, res) => {
    db('students')
       
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => res.status(500).json(err));
});


server.get('/api/students/:id', (req, res) => {
    const { id } = req.params;

    db('students')
        .where('id', '=', id)
        .then(student => {
            
            if (!student) {
                res.status(404).json({ message: 'The student with the specified ID does not exist.' });
                return;
            }
            res.status(200).json(student);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: 'The student info could not be retrieved.' })
        })
});


server.put('/api/students/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    db("students")
      .where({ id: id }) 
      .update(changes)
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});


server.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;

    db('students')
        .where({ id }) 
        .del()
        .then(count => {
            
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

const port = 5000;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});