const express = require('express');
const routerCohorts = express.Router();
const routerStudents = express.Router();
const TaskManager = require('../TaskManager/TaskManager.js')



// routes for COHORTS
routerCohorts.get('/', TaskManager.getAllCohorts);
routerCohorts.post('/', TaskManager.CreateNewCohort);
routerCohorts.get('/:id', TaskManager.getaCohort);
routerCohorts.put('/:id', TaskManager.UpdateCohort);
routerCohorts.delete('/:id', TaskManager.DestroyCohort);

// routes for students
routerStudents.get('/', TaskManager.getAllStudents);
routerStudents.post('/',  TaskManager.CreateNewStudent);
routerStudents.get('/:id',  TaskManager.getaStudent);
routerStudents.put('/:id',  TaskManager.UpdateStudent);
routerStudents.delete('/:id',  TaskManager.DestroyStudent);

module.exports = {
    
    routerCohorts : routerCohorts,
    routerStudents : routerStudents
};