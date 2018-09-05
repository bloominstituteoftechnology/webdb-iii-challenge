const morgan=require('morgan');
const helmet=require('helmet');
const express=require('express');
const server=express();
const knex=require('knex');
const dbConfig=require('./knexfile');
const db=knex(dbConfig.development);

server.use(morgan('dev')).use(helmet()).use(express.json());

server.get('/api/cohorts',(req,res)=>{
    db('cohorts').then(cohorts=>res.status(200).json(cohorts)).catch(err=>res.status(500).json(err));
})
server.get('/api/cohorts/:id',(req,res)=>{
    db('cohorts').where({'id':req.params.id}).then(row=>res.status(200).json(row)).catch(err=>res.status(500).json(err));
})
server.get('/api/cohorts/:id/students',(req,res)=>{
    db('students').where({'cohort_id':req.params.id}).then(rows=>res.status(200).json(rows)).catch(err=>res.status(500).json(err));
})
server.delete('/api/cohorts/:id',(req,res)=>{
    db('cohorts').where({'id':req.params.id}).del().then(count=>res.status(200).json(count)).catch(err=>res.status(500).json(err));
})
server.post('/api/cohorts',(req,res)=>{
    const cohort=req.body;
    db.insert(cohort).into('cohorts').then(id=>res.status(201).json(id)).catch(err=>res.status(500).json(err));
})
server.put('/api/cohorts/:id',(req,res)=>{
    const cohort=req.body;
    cohort.name ?
    db('cohorts').where({'id':req.params.id}).update(cohort).then(count=>res.status(200).json(count)).catch(err=>res.status(500).json(err))
    :null
})
server.post('/api/students',(req,res)=>{
    const student=req.body;
    student.name && student.cohort_id?
    db.insert(student).into('students').then(id=>res.status(201).json(id)).catch(err=>res.status(500).json(err))
    :null;
})
server.get('/api/students',(req,res)=>{
    db('students').then(students=>res.status(200).json(students)).catch(err=>res.status(500).json(err));
})
server.get('/api/students/:id',(req,res)=>{
    db('students').where({'id':req.params.id}).then(row=>res.status(200).json(row)).catch(err=>res.status(500).json(err));
})
server.delete('/api/students/:id',(req,res)=>{
    db('students').where({'id':req.params.id}).del().then(count=>res.status(200).json(count)).catch(err=>res.status(500).json(err));
})
server.put('/api/students/:id',(req,res)=>{
    const student=req.body;
    student.name && student.cohort_id?
    db('students').where({'id':req.params.id}).update(student).then(count=>res.status(200).json(count)).catch(err=>res.status(500).json(err)):
    null;
})
const port=9000;
server.listen(port,()=>console.log('Engines firing server starting up new horizons venturing.'))