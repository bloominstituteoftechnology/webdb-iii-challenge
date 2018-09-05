const morgan=require('morgan');
const helmet=require('helmet');
const express=require('express');
const server=express();
const knex=require('knex');
const dbConfig=require('./knexfile');
const db=knex(dbConfig.development);

server.use(morgan('dev')).use(helmet()).use(express.json());

server.get('/api/cohorts',(req,res)=>{
    db('cohorts').then(cohorts=>res.status(200).json(cohorts)).catch(err=>console.log(err));
})
server.get('/api/cohorts/:id',(req,res)=>{
    db('cohorts').where({'id':req.params.id}).then(row=>res.status(200).json(row)).catch(err=>console.log(err));
})
server.get('/api/cohorts/:id/students',(req,res)=>{
    db('students').where({'cohort_id':req.params.id}).then(rows=>res.status(200).json(rows)).catch(err=>console.log(err));
})
const port=9000;
server.listen(port,()=>console.log('Engines firing server starting up new horizons venturing.'))