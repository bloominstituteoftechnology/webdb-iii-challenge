const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

router.use(express.json());

router.post("/", async (req, res) => {
    const cohort = req.body;
    if (!cohort.name) {
        res.status(400).json({
            message: "Cohort name is required."
        })
    } else {
        try {
            const postCohort = await db.insert(cohort).into('cohorts');
            res.status(201).json( postCohort );
        }
        catch( err ) {
            res.status(500).json(err)
        }
    };
});

router.get("/", async (req, res) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    }
    catch ( err ) {
        res.status(500).json(err)
    };
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const cohort =  await db('cohorts').where({ id : id });
        res.status(200).json(cohort);
    }
    catch ( err ) {
        res.status(500).json(err);
    };
});

router.get("/:id/students", async (req, res) => {
    const { id } = req.params;
    try {
        const students = await db('students').where({ cohort_id : id })
        res.status(200).json(students);
    }
    catch ( err ) {
        res.status(500).json(err);
    };
});

router.put("/:id", async (req, res) => {
    const updated = req.body;
    const { id } = req.params;
    if (!updated.name) {
        res.status(400).json({
            message: "Cohort name is required."
        })
    } else {
        try {
            const update = await db('cohorts').where({ id }).update(updated);
            res.status(200).json(update);
        }
        catch ( err ) {
            res.status(500).json(err);
        };
    };
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try { 
        const deleted = await db('cohorts').where({ id }).del();
        res.status(200).json(deleted);
    }
    catch ( err ) {
        res.status(500).json(err);
    };
});

module.exports = router;