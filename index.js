const express = require('express');
const knex = require('knex');
// const router = express.Router();

const dbConfig=require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const Port = 4400;

server.use(express.json());

server.get('/LambdaCohorts', (req, res)=>{
    db('cohorts').then(rows=>{
        res.json(rows)
    })
    .catch(err=>{
        res.status(500)
            .json({err:"we are having an issue finding the Lambda Cohorts"})
    })
})

server.get('/LambdaCohorts/:id', (req, res)=>{
    const {id} = req.params;

    db('cohorts').where('id', id).then(row=>{
        
        row[0]?res.json(row):res.status(404).json({err: "This Cohort doesn't exsist"})
    })
    .catch(err=>{
        res.status(500).json({err: "We are having trouble grabbing the Cohort by ID please try again"})
    })
})

server.post('/LambdaCohorts', (req, res)=>{
    
})

server.listen(Port, ()=>{
    console.log(`Server is running on Port: ${Port}`)
})