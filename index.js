const express = require('express')

const server = express();
const knex = require('knex')

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)

server.use(express.json())

server.get('/', (req,res) => {
    res.send('hi')
})

server.get('/api/cohorts', (req,res) => {
    db('cohorts').then(table =>{
        res.json(table)
    })
})

server.get('/api/cohorts/:id', (req,res) => {
    const{id} = req.params
    db('cohorts').where({id: id}).then(table =>{
        res.json(table)
    })
})

server.get('/api/cohorts/:id/students', (req,res) => {
    const {id} = req.params
    db('students').where({cohort_id:id}).then(table => {
        res.json(table)
    })
})

server.post('/api/cohorts', (req,res) => {
    const newCohorts = req.body
    db.insert(newCohorts).into('cohorts').then(()=> {
        db('cohorts').then(cohorts => {
            res.json(cohorts)
        })
    })
})

server.put('/api/cohorts/:id', (req,res) => {
    const newCohorts = req.body
    const{id}= req.params
    db('cohorts').where({id:id})
    .update(newCohorts).then(() => {
        db('cohorts').then(cohorts => {
            res.json(cohorts)
        })
    })
})

server.delete('/api/cohorts/:id', (req,res) => {
  
    const{id}= req.params
    db('cohorts').where({id:id})
    .del().then(() => {
        db('cohorts').then(cohorts => {
            res.json(cohorts)
        })
    })
})



server.listen(9000, err => {
    console.log(`server running at port:9000 `)
})