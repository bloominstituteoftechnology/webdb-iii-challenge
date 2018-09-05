const express = require('express');
const knex = require('knex');
const server = express();

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

server.use(express.json());

server.post("/api/cohorts", (req, res) => {
    const cohort = req.body;
    if (!cohort.name) {
        res.status(400).json({
            message: "Cohort name is required."
        })
    } else {
        db.insert(cohort)
        .into('cohorts')
        .then( ids => {
            res.status(201).json(ids);
        })
        .catch( err => {
            res.status(500).json(err)
        })
    };
});

server.get("/api/cohorts", (req, res) => {
    db('cohorts')
    .then( cohorts => {
        res.status(200).json(cohorts)
    })
    .catch( err => {
        res.status(500).json(err)
    });
});

server.get("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
    db('cohorts')
    .where({ id })
    .then( cohort => {
        res.status(200).json(cohort);
    })
    .catch( err => {
        res.status(500).json(err);
    });
});

server.get("/api/cohorts/:id/students", (req, res) => {
    const { id } = req.params;
    db('students')
    .where({ cohort_id : id })
    .then( student => {
        res.status(200).json(student);
    })
    .catch( err => {
        res.status(500).json(err);
    });
});

server.put("/api/cohorts/:id", (req, res) => {
    const updated = req.body;
    const { id } = req.params;
    if (!updated.name) {
        res.status(400).json({
            message: "Cohort name is required."
        })
    } else {
        db('cohorts')
        .where({ id })
        .update(updated)
        .then( update => {
            res.status(200).json(update)
        })
        .catch( err => {
            res.status(500).json(err)
        });
    };
});

server.delete("/api/cohorts/:id", (req, res) => {
    const { id } = req.params;
    db('cohorts')
    .where({ id })
    .del()
    .then( cohorts => {
        res.status(200).json(cohorts);
    })
    .catch( err => {
        res.status(500).json(err);
    });
});

server.listen(8000, () => console.log('===Listening on port 8000.==='))