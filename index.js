const express = require('express');
const knex = require('knex');

const server = express();

server.use(express.json());



const dbConfig = require('./knexfile.js');

const db = knex(dbConfig.development);


server.get('/', (req, res) => {
res.send('API Running...');
});

// endpoints here


server.post('/cohorts', (req, res) => {
    const item = req.body;

    db('cohort').insert(item)
        .then((ids)=> { 
          res.status(201).json(ids);
        })
                .catch((fail) => {
                    console.log(fail);
                    res.status(500).json({ error: "There was an error while saving the cohort to the database." });
                });
});


server.get('/cohorts', (req, res) => {
    db('cohort').then(item => {
        res.status(200).json(item)
    }).catch((fail) => {
        console.log(fail);
        res.status(500).json({ error: "There was an error while receiving the cohort" });
    })
})



server.get(`/cohorts/:id`, (req,res) => {


    db('cohort').where({ id:req.params.id })
        .then((id) => {
            res.json(id);
        })
        .catch((fail) => {
            console.log(fail);
            res.status(404).json({message: "The cohort with the specified ID does not exist."});
        })

    .catch((fail) => {
        console.log(fail)
        res.status(500).json({error: "The cohort's information could not be retrieved."});
    })
})

// [GET] /api/cohorts/:id/students returns all students for the cohort with the specified id.

server.get(`/cohorts/:id/students`, (req,res) => {


    db('students').where({ cohort_id:req.params.id })
        .then((id) => {
            res.json(id);
        })
        .catch((fail) => {
            console.log(fail);
            res.status(404).json({message: "The students with the specified ID do not exist."});
        })

    .catch((fail) => {
        console.log(fail)
        res.status(500).json({error: "The student/cohort information could not be retrieved."});
    })
})



server.put(`/cohorts/:id`, (req, res) => {

    db('cohort').where({ id:req.params.id } ).update(req.body)
    .then((item) => {
        res.status(201).json(item);
    })
    .catch((fail) => {
        console.log(fail);
        res.status(404).json({ message: "The zoo with the specified ID does not exist."});
    });
})


server.delete('/cohorts/:id', (req, res) => {
    db('cohort').where({ id:req.params.id }).delete()
        .then((item) => {
            res.status(201).json(item);
            })
        .catch((fail) => {
            console.log(fail);
            res.status(404).json({ message: "The zoo with the specified ID didn't delete."});
            });
});

//Students

server.post('/students', (req, res) => {
    const item = req.body;

    db('students').insert(item)
        .then((ids)=> { 
          res.status(201).json(ids);
        })
                .catch((fail) => {
                    console.log(fail);
                    res.status(500).json({ error: "There was an error while saving the student to the database." });
                });
});


server.get('/students', (req, res) => {
    db('students').then(item => {
        res.status(200).json(item)
    })
    .catch((fail) => {
        console.log(fail);
        res.status(500).json({ error: "There was an error while retrieving the students." });
    })
})



const port = 2000;
server.listen(port, function() {
console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});