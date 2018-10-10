

const express = require('express');
const helmet = require('helmet');


const knex = require('knex')

const knexConfig = require('./knexfile.js')

const db = knex(knexConfig.development)

const server = express()

server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => {
    res.send("hello");
})

// post cohorts
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;

    db.insert(cohort)
        .into('cohorts')
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

// get cohorts

server.get('/api/cohorts', (req, res) => {

    db('cohorts')
        .then(cohort => {
            res.status(200).json(cohort)
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

// get cohort id 
server.get('/api/cohorts/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const course = await db('cohorts').where({ id }).first()

        res.status(200).json(course);
    }

    catch (err) {

        res.status(500).json(err)

    }

})

//update cohort

server.put('/api/cohorts/:id', (req,res)=>{
    const {id} = req.params;
    const changes = req.body;
    db('cohorts')
    .where({id})
    .update(changes)
    .then(change => { 
        res.status(200).json(change)
    })
    .catch(err => res.status(500).json(err))


db.update()

})

//delete cohort

server.delete('/api/cohorts/:id', (req,res)=>{
    const{id} = req.params;
    db('cohorts')
    .where({id})
    .del()
    .then(change => {
        res.status(200).json(change)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})


server.listen(9000, () => console.log('api running on 9000'))