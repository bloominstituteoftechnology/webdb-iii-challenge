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

server.get('/api/students', (req, res) => {
    db('students')
    .then(student => {
        if(student) {
            res.status(201).json(student)
        } else {
            res.status(401).json({message: 'error no students'})
        }
    }).catch(err => {
        res.status(500).json({message: 'error', err})
    })
})

server.get('/api/students/:id', (req, res) => {
    const id = req.params;
    db('students')
    .where(id)
    .then(student => {
        if(student.length > 0) {
            res.status(201).json(student)
        } else {
            res.status(404).json({message: 'error no matching id'})
        }
    }).catch(err =>{
        res.status(500).json({message:'err', err})
    })
})

server.post('/api/students', (req, res) => {
    const body = req.body
    db('students')
    .insert(body)
    .then(student => {
        res.status(201).json(student)
    })
    .catch(err => {
        res.status(500).json({message: 'error'})
    })
})

server.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db('students')
    .where({id: id})
    .update(changes)
    .then(student => {
        if(student){
            res.status(201).json(student)
        } else {
            res.status(400).json({message: 'error'})
        }
    }).catch(err => {
        res.status(500).json({message: 'error'})
    })
})

server.delete('/api/students/:id', (req, res) => {
    const id = req.params;
    db('students')
    .where(id)
    .del()
    .then(student => {
        if(student) {
            res.status(201).json(student)
        } else {
            res.status(404).json({message: 'error'})
        }
    }).catch(err => {
        res.status(500).json({message: 'error'})
    })
})

const port = 5001;
server.listen(port, ()=> {
    console.log(`Listening to port ${port}`)
})