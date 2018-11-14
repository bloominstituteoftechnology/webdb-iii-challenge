const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();
server.use(express.json());

// API Status
server.get('/', (req, res) => {res.send({"Cohort API": "live"})})

// GET all cohorts
server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json({message: "The cohorts could not be retrieved", err}));
});

// GET cohort by id
server.get('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where('id', Number(id)).first()
    .then(cohort => {
        if (cohort) {
            res.status(200).json(cohort)
        } else {
            res.status(404).json({message: "The cohort with the provided ID does not exist"})
        }
    })
    .catch(err => res.status(500).json({message: "The cohort information could not be retrieved", err}));
});

// GET students by cohort
server.get('/api/cohorts/:id/students', (req, res) => {
    const {id} = req.params;
    db('cohorts').where('id', Number(id)).first()
    .then(cohort => {
        if (cohort) {
            db('students').where('cohort_id', Number(id))
                .then(students => res.status(200).json(students))
                .catch(err => res.status(500).json({message: "The students could not be retrieved", err}))
        } else {
            res.status(404).json({message: "The cohort with the provided ID does not exist"})
        }
    })
    .catch(err => res.status(500).json({message: "The cohort information could not be retrieved", err}));
});

// POST new cohort
server.post('/api/cohorts', (req, res) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).json({message: "Please provide a name for the cohort"});
    } else {
        db('cohorts')
        .insert(req.body)
        .returning('id')
        .then(ids => {
          res.status(201).json(ids);
        })
        .catch(err => {
          res.status(500).json({ message: 'Error inserting', err });
        });
    }
});

// DELETE cohort
server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts')
      .where({ id: id })
      .del()
      .then(count => {
        if (count) {
            res.status(200).json(count)
        } else {
            res.status(404).json({message: "The cohort with the provided ID does not exist"})
        }
      })
      .catch(err => res.status(500).json(err));
});

// PUT (edit) an existing cohort
server.put('/api/cohorts/:id', (req, res) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).json({message: "Please provide a name for the cohort"});
    } else {
        db('cohorts')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count) {
                res.status(200).json(count);
            } else {
                res.status(404).json({message: "The cohort with the specified ID does not exist."});
            }
        })
        .catch(err => res.status(500).json({message: "The cohort could not be updated", err}));
    }
});



server.listen(9000, () => console.log(`Listening on http://localhost:9000`))