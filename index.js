const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 3000;

server.use(express.json());     //body parser middleware

// INSERT INTO cohorts (name) VALUES ('fullstack1')
server.post('/cohorts', (req , res) => {
    const cohort = req.body;
    console.log('cohort info', cohort)
    db('cohorts').insert(cohort)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to insert cohort'});
    });
});

// SELECT * FROM cohorts;
server.get('/cohorts', (req , res) => {
    db('cohorts')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: "Failed to find cohort"});
    })
});

// SELECT * FROM cohorts WHERE id = '3'
server.get('/cohorts/:id', (req , res) => {
    const {id} = req.params;
    db('cohorts').where('id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to find specific cohort'});
    })
});



//SERVER LISTEN
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});