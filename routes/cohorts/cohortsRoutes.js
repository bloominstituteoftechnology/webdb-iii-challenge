const express = require('express');
const cohorts = require('./cohortsModel.js');
const router = express.Router();

// Get a list of cohorts
router.get('/', (req, res) => {
    cohorts
      .get().then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
});

// Get a cohort by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const cohort = await cohorts.getById(id);

        if(cohort) {
            res.status(200).json(cohort);
        } else {
            res.status(404).json({message: 'Cohort not found'});
        }
    } catch (error) {
        res.status(500).json(err);
    }
})

// Get al cohort students by cohort id
router.get('/:id/students', async (req, res) => {
    try {
        const { id } = req.params;

        const students = await cohorts.getStudents(id);

        if(students) {
            if(students.length === 0) return res.status(404).send({message: 'No students in this cohort'});
            res.status(200).json(students);
        } else {
            res.status(404).send({message: 'No students in this cohort'});
        }
    } catch (error) {
        res.status(500).json(err);
    }
})

// Create cohorts
router.post('/', (req, res) => {
    // grab data from body
    const cohort = req.body;
    
    //save to database
    cohorts.post(cohort).then(ids => {
        res.status(201).json(ids);
    }).catch( err => {
        res.status(500).json(err);
    });
});

// Update cohort
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    cohorts.update(id, changes).then(count => {

        if(!count || count < 1) {
            res.status(404).json({message: 'No cohorts found to update'});
        } else {
            res.status(200).json(count);
        }
        
    }).catch(err => console.log(err));
});

// Delete a cohort
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    cohorts.remove(id).then(count => {
        if(!count || count < 1) {
            res.status(404).json({message: 'No cohorts found to delete'});
        } else {
            res.status(200).json(count);
        }
    }).catch(err => console.log(err));
});

module.exports = router;