const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const cors = require('cors');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

// log all method calls and addresses
function logger(req, res, next){
  console.log(`${req.method} to ${req.url}`)

  next();
}

server.use(logger);

server.get('/', (req, res) => {
    res.send("Working");
})


/*** COHORTS API ENDPOINTS ***/

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: `Something went wrong retrieving the cohorts.\n`})
    })
})

server.get('/api/cohorts/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const cohort = await db('cohorts').where({id}).first();
        if(cohort){
            res.status(200).json(cohort);
        } else {
            res.status(404).json({error: `Could not find cohort with ID ${id}.\n`})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;

    db.insert(cohort).into('cohorts')
    .then(ids => {
        res.status(201).json(ids[0])
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db('cohorts').where({id}).update(changes)
    .then(count => {
        if(!count || count < 1){
            res.status(404).json({error: `Could not find cohort with ID ${id}.\n`})
        } else {
            res.status(200).json(count);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;

    db('cohorts').where({id}).del()
    .then(count => {
        if(!count || count < 1){
            res.status(404).json({error: `Could not delete cohort ${id}.`})
        } else {
            res.status(200).json(count);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

server.get('/api/cohorts/:id/students', (req, res) => {
    const {cohort_id} = {
        cohort_id: req.params.id
    }

    db('students').where({cohort_id})
    .then(students => {
        if(!students || students < 1){
            res.status(404).json({error: `Could not find any students in cohort ${req.params.id}.`})
        } else {
        res.status(200).json(students);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// [POST] /api/cohorts This route should save a new cohort to the database.
// [GET] /api/cohorts This route will return an array of all cohorts.
// [GET] /api/cohorts/:id This route will return the cohort with the matching id.
// [GET] /api/cohorts/:id/students returns all students for the cohort with the specified id.
// [PUT] /api/cohorts/:id This route will update the cohort with the matching id using information sent in the body of the request.
// [DELETE] /api/cohorts/:id This route should delete the specified cohort.




const port = 9000;
server.listen(port, function() {
    console.log(`\n *** Web API Listening on http://localhost:${port} *** \n`);
})