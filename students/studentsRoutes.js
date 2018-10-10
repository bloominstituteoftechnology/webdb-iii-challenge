const express = require('express');

const students = require('./studentsModel.js');

const router = express.Router();

// get an array of all students
router.get('/', (req, res) => {
    students
        .find()
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => res.status(500).json(err));
});

// get a student by id

// add new student to database

// update student with matching id

// delete student with matching id