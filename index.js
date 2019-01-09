const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 3000;

server.use(express.json());     //body parser middleware


// [POST] /api/cohorts This route should save a new cohort to the database.
// INSERT INTO cohorts (name) VALUES ('fullstack1')
server.post('/cohorts', (req , res) => {
    const cohort = req.body;
    console.log('cohort info', cohort)
    db('cohorts').insert(cohort)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to insert cohort'});
    });
});

// [GET] /api/cohorts This route will return an array of all cohorts.
// SELECT * FROM cohorts;
server.get('/cohorts', (req , res) => {
    db('cohorts')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "Failed to find cohort"});
    })
});

// [GET] /api/cohorts/:id This route will return the cohort with the matching id.
// SELECT * FROM cohorts WHERE id = '3'
server.get('/cohorts/:id', (req , res) => {
    const {id} = req.params;
    db('cohorts').where('id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to find specific cohort'});
    })
});

//  [GET] /api/cohorts/:id/students returns all students for the cohort with the specified id.
// DIFFERENT END POINT FROM THE REST
server.get('/cohorts/:id/students', (req, res) => {
    const {id} = req.params;
    db('students').where('cohort_id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find specific students for this particular cohort"})
    })
})



// [PUT] /api/cohorts/:id This route will update the cohort with the matching id using information sent in the body of the request.
// UPDATE cohorts SET name = 'fullstack1' WHERE id = 2
server.put('/cohorts/:id', (req , res) => {
    const {id} = req.params;
    const cohort = req.body;

    db('cohorts').where('id', id).update(cohort)
    .then(rowCount => {
        res.status(200).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to update cohort'});
    })
})

// [DELETE] /api/cohorts/:id This route should delete the specified cohort.
server.delete('/cohorts/:id', (req , res) => {
    const {id} = req.params;
    db('cohorts').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to delete cohort"})
    });
})

// ************************************** //

//[POST] /students This route should save a new student to the database.
server.post('/students', (req , res) => {
    const student = req.body;
    db('students').insert(student)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "Failed to insert student"});
    });
});

//[GET] /students This route will return an array of all students.
server.get('/students', (req , res) => {
    db('students')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "Failed to find students"});
    });
});

//[GET] /students/:id This route will return the student with the matching id.
server.get('/students/:id', (req, res) => {
    const {id} = req.params;
    db('students').where('id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "Failed to find specific student"});
    })
});




//[PUT] /students/:id This route will update the student with the matching id using information sent in the body of the request.
server.put('/students/:id', (req,res) => {
    const {id} = req.params;
    const student = req.body;

    db('students').where('id', id).update(student)
    .then(rowCount => {
        res.status(200).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to update student"});
    })
})


//[DELETE] /students/:id This route should delete the specified student.
server.delete('/students/:id', (req,res) => {
    const {id} = req.params;
    db('students').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to delete student"})
    });
})

//SERVER LISTEN
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});