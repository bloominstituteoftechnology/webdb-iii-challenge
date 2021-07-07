const express = require('express');
const cohorts = require('./cohortModels.js');
const router = express.Router();

// [GET] /api/cohorts This route will return an array of all cohorts.
router.get('/', (req,res)=>{
    cohorts
    .find()
    .then(cohort =>{
        res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
});

// [GET] /api/cohorts/:id This route will return the cohort with the matching id.
router.get('/:id', async (req,res) =>{
try{
    const {id} = req.params;
    const cohort = await cohort.findById(id);
    if(cohort) {
        res.status(200).json(cohort);
    } else {
        res.status(404).json({message: 'Cannot find cohort with that ID.' });
    }
} catch (err) {
    res.status(500).json(err)
}
});

// [POST] /api/cohorts This route should save a new cohort to the database.
router.post('/', (req, res) => {
    const cohort = req.body;
    cohorts
    .add(cohort)
    .then(id => {
        if(id > 0) {
            res.status(201).json(id);
        } else {
            res.status(404).json({message:'zack help 101'});
        }   
    })
    .catch(err => {
        res.status(500).json(err);
    });
});
// [PUT] /api/cohorts/:id This route will 
// update the cohort with the matching id using information 
// sent in the body of the request.

router.put('/:id', (req,res)=>{
    const{id} = req.params;
    const changes = req.body;
    cohorts
    .update(id,changes)
    .then(count =>{
        if(!count || count === 0 ) {
            res.status(404).json({message:'No cohort to actually update.'});
        } else {
            res.status(200).json(cohort);
        }
    })
    .catch(err => res.status(500).json(err));
});
// [DELETE] /api/cohorts/:id This route should delete the specified cohort.

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    cohorts
    .remove(id)
    .then(count => {
        if(!count || count === 0 ){
            res.status(404).json({message:'No cohort to actually update.'});
        } else {
            res.status(200).json(cohort);
        }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;