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
    // console.log('crayon info', crayon);
    db('cohorts').insert(cohort)
    .then((ids) => {
        res.status(201).json(ids);
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({ err: "Failed to insert cohort"});
    });
});

server.get('/api/cohorts/:id', (req, res) => {
    const id = req.params.id;
    db('cohorts').where('id', id)
    .then(cohort => {
        res.json(cohort);
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find cohort"});
    })
});

// *** [GET] /api/cohorts/:id/students
server.get('/api/cohorts/:id/students', (req, res) => {
    const id = req.params.id;
    db('cohorts').where('id', id)
    .then()
    .catch()
});
// ***

server.put('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    const cohort = req.body;

    db('cohorts').where('id', id) // where comes before the update!
    .update(cohort)
    .then(rowCount => {
        res.json(rowCount);
    })
    .catch(err => {
    res.status(500).json({err: "Failed to update cohort"});
    })
});

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts').where('id', id)
    .del()
    .then(rowCount => {
        res.status(201).json(rowCount);
    })
    .catch(err => {
        res.status(500).json({err: "Failed to delete cohort"});
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
    // console.log('crayon info', crayon);
    db('students').insert(student)
    .then((ids) => {
        res.status(201).json(ids);
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({ err: "Failed to insert student"});
    });
});

// **** Have the student returned by the [GET] /students/:id endpoint include the cohort name and remove the cohort_id fields.
server.get('/api/students/:id', (req, res) => {
    const id = req.params.id;
    db('students').where('id', id)
    .then(student => {
        res.json(student);
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find student"});
    })
});
// ***

server.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const student = req.body;

    db('students').where('id', id)
    .update(student)
    .then(rowCount => {
        res.json(rowCount);
    })
    .catch(err => {
        res.status(500).json({err: "Failed to update student"});
    })
});

server.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;

    db('students').where('id', id)
    .del()
    .then(rowCount => {
        res.status(201).json(rowCount);
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