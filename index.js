const express = require('express');
const server = express();
const knex = require('knex');
const dbConfig = require('./knexfile');

const db=knex(dbConfig.development)
const PORT = 8050;

server.use(express.json());

server.get('/api/cohorts', (req, res) =>{
    db('cohorts')
    .then(rows => res.json(rows))
    .catch(err =>{
        res.status(500)
        json({message: 'unable to get cohorts'})
    })
});

server.listen(PORT, ()=>{
    console.log("we are a go")
})