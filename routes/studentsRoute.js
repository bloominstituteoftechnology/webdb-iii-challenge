const express = require('express');
const router = express.Router();
const students = require('./studentsModel.js');


// endpoints here for the student

//POST /api/students
router.post('/', async (req, res) => {
    try {
      const student = req.body;
      if(student.name.length > 0){
        const newStudent = await students.addStudent(student);
        res.status(200).json(newStudent);
      } else {
        res.status(404).json({message: "Please enter the name of the student"});
      }
    }
    catch (err) {
      res.status(500).json({message: "There was an error while trying to save a student to the data base"});
    }
  });
  
  
  //GET /api/students
  router.get('/', async (req, res) => {
    try {
      const studentsList  = await students.findStudents();
      res.status(200).json(studentsList);
    }
    catch (err) {
      res.status(500).json({message: "There was an error while trying to connect to the data base"});
    }
  });
  
  //GET /api/cohorts/:id
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const studentById = await students.findStudentById(id);
      if(studentById){
        res.status(200).json(studentById);
      } else {
        res.status(404).json({message: "Please provide the correct ID of the student"})
      }
    }
    catch (err){
      res.status(500).json({message: "There was an error while trying to retrieve a student from the data base"});
    }
  });
  
  //DELETE /api/cohorts/:id
  router.delete('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const count = await students.removeStudent(id);
  
      if(!count || count < 1){
          res.status(404).json({message: "Student was not found to be removed"})
      } else{
          res.status(200).json(count);
      }
    }
    catch (err) {
      res.status(500).json({message: "There was an error while trying to delete a student from the data base"});
      }
  });
  
  //PUT /api/students/:id 
  router.put('/:id', async(req, res) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      if (changes.name.length > 0) {
        const updated = await students.updateStudent(id, changes);
        res.status(200).json(updated);
      } else {
        res.status(404).json({message: "Please enter the name of the student"});
      }
    }
    catch (err){
      res.status(500).json({message: "There was an error while trying to update a student in the data base"});
    }
  });


module.exports = router;