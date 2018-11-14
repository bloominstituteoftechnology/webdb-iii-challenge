const express = require('express');
const helmet = require('helmet');
const knex = require('knex')

const server = express();
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(cohort => {
        res.status(201).json(cohort);
    })
    .catch(err => res.status(500).json({message: 'error', err}))
})

server.get('/api/cohorts/:id', (req, res) => {
    const id  = req.params;
    db('cohorts')
    .where(id)
    .then(cohort => {
        if(cohort.length > 0) {
            res.status(201).json(cohort)
        } else {
            res.status(404).json({message: 'error no id match'})
        }
       
    })
    .catch(err => {
        res.status(500).json({message: 'error', err})
    })
})

server.get('/api/cohorts/:id/students', (req, res) => {
    
    const { id } = req.params;
    db('students')
    .where({cohort_id: id})
    .then(students => {
        res.status(201).json(students);
    })
    .catch(err => {
        res.status(500).json({message: 'error', err})
    })
})

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db('cohorts')
    .insert(cohort)
    .then(cohort => {
        res.status(201).json(cohort)
    })
    .catch(err => {
        res.status(500).json({message: 'error', err})
    })
})

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
    .where({id: id})
    .del()
    .then(count => {
        res.status(201).json(count)
    })
    .catch(err => {
        res.status(500).json({message: 'error', err})
    })
})

server.put('/api/cohorts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    db('cohorts')
    .where({ id: id})
    .update(changes)
    .then(cohort => {
        if(cohort.id) {
            res.status(201).json({cohort})
        } else {
            res.status(404).json({message: 'error no matching id'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error', err})
    })
})


const port = 5001;
server.listen(port, ()=> {
    console.log(`Listening to port ${port}`)
})