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

server.post('/LambdaCohorts', (req, res))

server.listen(Port, ()=>{
    console.log(`Server is running on Port: ${Port}`)
})