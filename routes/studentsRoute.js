const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

router.use(express.json());

router.post("/", async (req, res) => {
    const student = req.body;
    if (!student.name) {
        res.status(400).json({
            message: "student name is required."
        })
    } else {
        try {
            const postStudent = await db.insert(student).into('students');
            res.status(201).json( postStudent );
        }
        catch( err ) {
            res.status(500).json(err)
        }
    };
});

router.get("/", async (req, res) => {
    try {
        const students = await db('students');
        res.status(200).json(students);
    }
    catch ( err ) {
        res.status(500).json(err)
    };
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const student =  await db('students').where({ id });
        res.status(200).json(student);
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
            message: "Student name is required."
        })
    } else {
        try {
            const update = await db('students').where({ id }).update(updated);
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
        const deleted = await db('students').where({ id }).del();
        res.status(200).json(deleted);
    }
    catch ( err ) {
        res.status(500).json(err);
    };
});

module.exports = router;