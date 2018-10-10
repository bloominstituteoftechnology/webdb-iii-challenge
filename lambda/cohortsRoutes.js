const express = require('express');

const db = require('./cohortsModel.js');

const router = express.Router();

//GET ALL COHORTS
router.get('/cohorts', (req, res) => {

    db
    .find()
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => res.status(500).json(err));

})

//GET ONE COHORT
router.get('/cohorts/:id', (req, res)=> {
    let {id} = req.params;
    
    db.findById(id)
        .then(cohort => {
            res.status(200).json(cohort);
        })
        .catch(err => res.status(500).json(err));
})

//ADD COHORT

router.post('/cohorts', (req, res)=> {
     let cohort = req.body
    
    db.add(cohort)
        .then(response => {
            console.log(response)
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
})

module.exports = router;