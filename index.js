const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());



server.get('/',(req,res)=>{
    res.status(200).send('ok.. ok.. im up')
  })

server.get('/api/cohorts',async (req,res) =>{
    try {
        const response = await db('cohorts').select().orderBy('name');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error.toString()});
    }
})
server.get('/api/cohorts/:id',async (req,res) =>{
    try {
        const response = await db('cohorts').select().where('id',req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error.toString()});
    }
})
server.get('/api/cohorts/:id/students',async (req,res) =>{
    try {
        const response = await db('students').select().where('cohortId',req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error.toString()});
    }
})

server.delete('/api/cohorts/:id',async(req,res)=>{
    try {
        const response = await db('cohorts').delete().where('id',req.params.id)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error.toString()});        
    }
})

server.post('/api/cohorts',async (req,res)=>{
    const cohort = req.body;
    try {
        const response = await db('cohorts').insert(cohort);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({message:error.toString()});        
    }
})
server.put('/api/cohorts/:id',async (req,res)=>{
    const id = req.params.id;
    const cohort = req.body;
    try {
        const response = await db('cohorts').update(cohort).where('id',id)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error.toString()});        
    }
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

