const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();
server.use(express.json());

// [GET] /
server.get('/', (req, res) => {
    res.json({ api: 'running' });
});

// [GET] /students
server.get('/api/students', (req, res) => {
    db('students')
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => {
            res.status(500).json({ error: err, errorMessage: 'Error retrieving students' });
        });
});

// [GET] /students/:id
// Return student with cohort name instead of id
// Use query join to pull cohort name from cohort table
// {
//    id: 1,
//    name: 'Lambda Student',
//    cohort: 'Full Stack Web Infinity'
// }

// [GET] /api/cohorts
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => {
            res.status(500).json({ error: err, errorMessage: 'Error retrieving cohorts' });
        })
});

// [GET] /api/cohorts/:id
server.get('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .then(cohort => {
            if (cohort.length) {
                res.status(200).json(cohort);
            } else {
                res.status(404).json({ errorMessage: 'The cohort at the specified id does not exist.' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, errorMessage: 'Error retrieving cohort, id may not exist' });
        })
})

// [GET] /api/cohorts/:id/students
server.get('/api/cohorts/:id/students', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .then(cohort => {
            if (cohort.length) {
                return db('students').where({ cohort_id: req.params.id });
            }
        })
        .then(students => {
            if (!students.length) {
                res.status(200).json({ successMessage: 'There are currently no students in this cohort.' });
            } else {
                res.status(200).json(students);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, errorMessage: 'Error retrieving students, cohort id may not exist' });
        })
})

// [POST] /api/cohorts
server.post('/api/cohorts', (req, res) => {
    if (req.body.name) {
        db('cohorts')
            .insert(req.body)
            .then(id => {
                return db('cohorts').where({ id: id[0] });
            })
            .then(cohort => {
                res.status(201).json(cohort);
            })
            .catch(err => {
                res.status(500).json({ error: err, errorMessage: 'Error creating cohort' });
            });
    } else {
        res.status(400).json({ errorMessage: 'New cohort must have a non-empty name' });
    }
});

// [POST] /students
// ****** To do
// - change output to be cohort name not id on return
server.post('/api/students', (req, res) => {
    if(req.body.name && req.body.cohort_id){
        db('cohorts')
            .where({ id: req.body.cohort_id})
            .then(cohort => {
                if(cohort.length) {
                    return db('students').insert(req.body);
                } else {
                    throw new Error();
                }
            })
            .then(id => {
                return db('students').where({ id: id[0]});
            })
            .then(student => {
                res.status(201).json(student); // refactor to have cohort name not id
            })
            .catch(err => {
                res.status(500).json({ error: err, errorMessage: 'Error creating student, cohort id may not exist' });
            })
    } else {
        res.status(400).json({ errorMessage: 'New student must have a non-empty name and cohort id' });
    }
})

// [PUT] /api/cohorts/:id
server.put('/api/cohorts/:id/', (req, res) => {
    if (req.body.name) {
        db('cohorts')
            .where({ id: req.params.id })
            .update(req.body)
            .then(count => {
                if (count) {
                    return db('cohorts').where({ id: req.params.id });
                } else {
                    throw new Error();
                }
            })
            .then(cohort => {
                res.status(200).json(cohort);
            })
            .catch(err => {
                res.status(500).json({ error: err, errorMessage: 'Error updating cohort, cohort id may not exist' });
            })
    } else {
        res.status(400).json({ errorMessage: 'Updated cohort must have a non-empty name' });
    }
});

// [PUT] /students/:id
// Check that student name and cohort_id are valid.
// Return student with cohort name instead of id

// [DELETE] /api/cohorts/:id
server.delete('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .then(cohort => {
            if (cohort.length) {
                return db('cohorts').where({ id: req.params.id }).del();
            }
        })
        .then(count => {
            if (count) {
                res.status(200).json({ successMessage: 'Successfully deleted cohort' });
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, errorMessage: 'Error deleting cohort, cohort id may not exist' });
        });
});

// [DELETE] /students/:id 
// This route should delete the specified student.
// Return success message.

const port = 9000;
server.listen(port, () => {
    console.log(`\nListening on port ${port}\n`);
});