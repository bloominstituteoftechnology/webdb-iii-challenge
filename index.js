const express = require('express');
const server = express();
const knex = require('knex');
const dbConfig = require('./knexfile');

const db=knex(dbConfig.development)
const PORT = 8050;

server.use(express.json());

// POST /api/cohorts



//GET

server.get('/api/cohorts', (req, res) =>{
    db('cohorts')
    .then(rows => res.status(200).json(rows))
    .catch(err =>{
        res
        .status(500)
        .json({error: 'Unable to get cohorts'})
    })
});

// /api/cohorts/:id

server.get('/api/cohorts/:id', (req,res) =>{
    const {id} = req.params;
    db('cohorts').where('id', id)
    .then(cohort =>{
        if(cohort.length !==0){
            res
            .status(200)
            .json(cohort)
        } else {
            res
            .status(404)
            .json({error: "The cohort with the specified ID does not exist"})
        }
    })
    .catch(err =>{
        res.status(500).json({error: "The Cohort could not be retrieved"})
    })
});

// /api/cohorts/:id/students
server.get('/api/cohorts/:id/students', (req, res)=>{
    const {id} = req.params;
    db('students').where('cohort_id', id)
    .then(students =>{
        console.log(students);
        res
        .status(200)
        .json(students)
    })
    .catch(err =>{
        res
        .status(500)
        .json({error: "The students within the specified cohort could not be retrieved"})
    })
});

//PUT /api/cohorts/:id

//DELETE /api/cohorts/:id


server.listen(PORT, ()=>{
    console.log("we are a go")
})