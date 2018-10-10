const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(morgan('combined'));
server.use(express.json());

const port = 9000;

server.get('/', (req, res)=> {
    res.send('Hello :)');
});

server.post('/api/cohorts', (req, res)=> {
    const cohort = req.body;
    db.insert(cohort)
        .into('cohorts')
        .then(ids=> {
            if (!cohort) {
                res.status(400).json({message: "Please add the appropriate information to this request"});
            }
            res.status(201).json(ids);
        })
        .catch(err=> {
            res.status(500).json(err);
        })
});

server.get('/api/cohorts', (req, res)=> {
    db('cohorts')
    .then(cohorts=> {
        if (!cohorts) {
            res.status(404).json({message: "The information you requested does not exist"});
        }
        res.status(200).json(cohorts);
    })
    .catch(err=> {
        res.status(500).json({error: "The information you requested could not be retrieved from the database"});
    })
});

server.get('/api/cohorts/:id', async (req, res)=> {
    try {
        const {id} = req.params;
        const cohort = await db('cohorts')
        .where({id})
        .first()
        if (!cohort) {
            res.status(404).json({message: "Cohort not found"});
        } else {
            res.status(200).json(cohort);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

server.get('/api/cohorts/:cohort_id/students', (req, res)=> {
    const {cohort_id} = req.params;
    db('cohorts')
        .where({cohort_id})
        .first()
        .then(cohortStudents=> {
           if (cohortStudents === 0) {
               res.status(404).json({message: "Nothing to display"});
           } 
           res.status(200).json(cohortStudents);
        })
        .catch(err=> {
            res.status(500).json({error: "This information could not be retrieved from the database"});
        })
});

server.put('/api/cohorts/:id', (req, res)=> {
    const {id} = req.params;
    const changes = req.body;
    db('cohorts')
        .where({id})
        .update(changes)
        .then(count => {
            if (! count || count < 1) {
                res.status(404).json({message: "Cohort not found"});
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err=> {
            res.status(500).json(err);
        })
});

server.delete('/api/cohorts/:id', (req, res)=> {
    const {id} = req.params;
    db('cohorts')
    .where({id})
    .del()
    .then(count=> { 
        if (!id) {
            res.status(404).json({message: "The information you requested does not exist"});
        }
        res.status(200).json(count);
    })
    .catch(err=> {
        res.status(500).json(err);
    })
});

server.listen(port, ()=> console.log(`API running on port ${port}`));