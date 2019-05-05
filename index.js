const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.get("/api/cohorts", (req, res) => {
    db("cohorts").then(cohorts => {
        res.status(200).json(cohorts);
    }).catch(error => {
        res.status(500).json({ "error": "Error retrieving cohort data" });
    });
});

server.post("/api/cohorts", (req, res) => {
    if (req.body && req.body.name && typeof req.body.name === "string") {
        db("cohorts")
            .insert(req.body)
            .then(ids => {
                res.status(201).json(ids[0]);
            }).catch(error => {
                res.status(500).json({ "error": "Error inserting cohort data" });
            });
    } else {
        res.status(400).json({ "error": "Incorrectly formatted cohort data" });
    }
});

server.get("/api/cohorts/:id", (req, res) => {
    db("cohorts")
        .where({ id: Number(req.params.id) })
        .then(cohort => {
            if (cohort.length !== 0)
                res.status(200).json(cohort);
            else
                res.status(404).json({ "error": "Cohort not found" });
        }).catch(error => {
            res.status(500).json({ "error": "Error retrieving cohort data" });
        });
});

server.put("/api/cohorts/:id", (req, res) => {
    db("cohorts")
        .where({ id: Number(req.params.id) })
        .then(cohort => {
            if (cohort.length !== 0) {
                if (req.body && req.body.name && typeof req.body.name === "string") {
                    db("cohorts")
                        .where({ id: Number(req.params.id) })
                        .update(req.body)
                        .then(edited => {
                            res.status(200).json(edited);
                        }).catch(error => {
                            res.status(500).json({ "error": "Error updating cohort data" });
                        });
                } else {
                    res.status(400).json({ "error": "Incorrectly formatted cohort data" });
                }
            } else {
                res.status(404).json({ "error": "Cohort not found" });
            }
        }).catch(error => {
            res.status(500).json({ "error": "Error retrieving cohort data" });
        });
});

server.delete("/api/cohorts/:id", (req, res) => {
    db("cohorts")
        .where({ id: Number(req.params.id) })
        .then(cohort => {
            if (cohort.length !== 0) {
                db("cohorts")
                    .where({ id: Number(req.params.id) })
                    .del().then(deleted => {
                        res.status(200).json(deleted);
                    });
            } else {
                res.status(404).json({ "error": "Cohort not found" });
            }
        }).catch(error => {
            res.status(500).json({ "error": "Error retrieving cohort data" });
        });
});

server.get("/api/cohorts/:id/students", (req, res) => {
    db("students")
        .where({ cohort_id: Number(req.params.id) })
        .then(students => {
            if (students.length !== 0)
                res.status(200).json(students);
            else
                res.status(404).json({ "error": "No students found" });
        }).catch(error => {
            res.status(500).json({ "error": "Error retrieving student data" });
        });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});