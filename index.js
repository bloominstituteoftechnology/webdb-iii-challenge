const express = require('express')
const knex = require('knex');
const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 5434;

server.use(express.json());

server.get('/', (req, res) => {
    res.json({message: "Server up and running!!"})
});

// Cohort End Point Methods

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    
    .then(cohorts => {
        res.json(cohorts);
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find cohorts"});
    })
});

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;

    if (cohort.name) {
        db('cohorts').insert(cohort)
        .then((ids) => {
            res.status(201).json(ids);
        })
        .catch(err => {
            
            res.status(500).json({ err: "Failed to insert cohort"});
        });
    } else {
        res.status(400).json({message: "Provide cohort name."})
    }
});

server.get('/api/cohorts/:id', (req, res) => {
    const id = req.params.id;
    db('cohorts').where('id', id)
    .then(cohort => {
        if (cohort.length > 0) {
            res.json(cohort);
        }
        else {
            res.status(404).json({error: "The post with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find cohort"});
    })
});

// *** [GET] /api/cohorts/:id/students
server.get('/api/cohorts/:id/students', (req, res) => {
    const cohort_id = req.params;
    db('students').where('cohort_id', cohort_id)
    .then(students => {
        res.json(students);
    })
    .catch(err => {
        res.status(500).json({ err: `Error obtaining ${cohort_id} cohort`});
    })
});
// ***

server.put('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    const cohort = req.body;
    
    if (cohort.name) {
        db('cohorts').where('id', id)
        .update(cohort)
        .then(rowCount => {
            if (rowCount) {
                db('cohorts').where('id', id)
                .then(cohort => {
                    res.json(cohort);
                });
            } else {
                res.status(404).json({message: "The cohort with the specified name does not exist."});
            }
        })
        .catch(err => {
            res.status(500).json({err: "Failed to update cohort"});
        })
    } else {
        res.status(400).json({message: "Provide cohort name."});
    }
});

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts').where('id', id)
    .del()
    .then(rowCount => {
        if (rowCount) {
            res.status(201).json(rowCount);
        } else {
            res.status(404).json({message: "The cohort with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({err: "Failed to delete cohort."});
    })
});

//Student End Point Methods

server.get('/api/students', (req, res) => {
    db('students')
    .then(students => {
        res.json(students);
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find students"});
    })
});

server.post('/api/students', (req, res) => {
    const student = req.body;

    if (student.name && student.cohort_id) {
        db('students').insert(student)
        .then((ids) => {
            res.status(201).json(ids);
        })
        .catch(err => {
    
            res.status(500).json({ err: "Failed to insert student"});
        });
    } else {
        res.status(400).json({message: "Provide student name and cohort_id."})
    }
    
});

// **** Have the student returned by the [GET] /students/:id endpoint include the cohort name and remove the cohort_id fields.
server.get('/api/students/:id', (req, res) => {
    const id = req.params.id;
    db('students').where('id', id)
    .then(student => {
        if (student.length > 0) {
            res.json(student);
        }
        else {
            res.status(404).json({error: "The student with the specified id does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find student"});
    })
});
// ***

server.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const student = req.body;

    if (student.name && student.cohort_id) {
        db('students').where('id', id)
        .update(student)
        .then(rowCount => {
            if (rowCount) {
                db('students').where('id', id)
                .then(student => {
                    res.json(student);
                });
            } else {
                res.status(404).json({message: "The student with the specified name does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({err: "Failed to update student"});
        })
    } else {
        res.status(400).json({message: "Provide student name and cohort_id."});
    }
});

server.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;

    db('students').where('id', id)
    .del()
    .then(rowCount => {
        if (rowCount) {
            res.status(201).json(rowCount);
        } else {
            res.status(404).json({message: "The cohort with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({err: "Failed to delete student"});
    })
});



// this was my attempt to set up routers for cohorts and students

// const express = require('express');
// const cohortRouter = require('./data/routers/cohort_router');
// const studentRouter = require('./data/routers/student_router');

// const server = express();
// PORT = 5434;

// server.use(express.json());

// server.use('/api/cohorts', cohortRouter);
// server.use('api/students', studentRouter);

// server.get('/', (req, res) => {
//     res.json({message: "Up and running."})
// })


// Keep this at bottom of file!!
server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});