const express = require('express'); 
const knex = require('knex'); 

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express(); 
server.use(express.json()); 

server.get('/api/cohorts', (req,res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts); 
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.get('/api/cohorts/:id', (req,res) => {
    const {id} = req.params; 
    db('cohorts').where({id}).then(cohort => {
        res.status(200).json(cohort); 
    }).catch(err => {
        res.status(500).json(err); 
    })
})

server.post('/api/cohorts', (req,res) => {
    const data = req.body; 
    db.insert(data).into('cohorts').then(id => {
        res.status(200).json(id); 
    }).catch(err => {
        res.status(500).json(err);
    })
})

server.delete('/api/cohorts/:id', (req,res) => {
    const {id} = req.params; 
    db('cohorts').where({id}).del().then(count => {
        if(count > 0){
            res.status(200).json({message: "Successfully deleted!"})
            return; 
        }
        res.status(400).json({error: "ID specified not found"})
    }).catch(err => {
        res.status(500).json(err); 
    })
})

server.put("/api/cohorts/:id", (req, res) => {
    const data = req.body; 
    const {id} = req.params; 
    db('cohorts').where({id}).update(data).then(count => {
        res.status(200).json({message: "Successfully updated database"})
    }).catch(err => {
        res.status(500).json({err}); 
    })
})



server.listen(4000); 