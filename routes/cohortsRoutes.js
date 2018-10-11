const express = require('express');

const cohorts = require('../models/cohortsModel.js');

const router = express.Router();

router.get('/', (req, res)=>{
    cohorts.getAll()
        .then(cohorts =>{
            res.status(200).json(cohorts);
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('error in get');
        });
});

router.get('/:id', (req, res)=>{
    const {id} = req.params;
    cohorts.getById(id)
        .then(cohort =>{
            res.status(200).json(cohort);
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res)=>{
    const {name} = req.body;
    const cohort = {name};
    cohorts.post(cohort)
        .then(ids =>{
            res.status(200).json(ids[0]);
        })
        .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {name} = req.body;
    const changes = {name};
    cohorts.put(id,changes)
        .then(count =>{
            if(count>0){
                res.status(200).json(count);
            }else{
                res.status(404).json('No cohort with that ID found.');
            }
        })
        .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    cohorts.del(id)
        .then(cohort =>{
            if(cohort){
                res.status(200).json(cohort);
            }else{
                res.status(404).json('No cohort with that ID found.');
            }
        })
        .catch(err => res.status(500).json(err));
});

router.get('/:id/students', (req, res)=>{
    const {id} = req.params;
    cohorts.findStudentsByCohort(id)
    .then(students =>{
        if(students.length<1){
            res.status(404).json('Cohort has no students.');
        }else if(students){
            res.status(200).json(students);
        }else{
            res.status(404).json('No cohort with that ID found.');
        }
    })
    .catch(err => res.status(500).json(err));
})

module.exports = router;