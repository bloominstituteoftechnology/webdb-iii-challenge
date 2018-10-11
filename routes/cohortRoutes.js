const express = require('express');

const cohorts = require('../data/helpers/cohortModel.js')

const router = express.Router();

//GET
router.get('/', (req, res) => {
    cohorts
      .find()
      .then(allCohorts => {
          res.status(200).json(allCohorts);
      })
      .catch(err => res.status(500).json(err));
});

router.get('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const cohort = await cohorts.findById(id);

        if (cohort) {
            res.status(200).json(cohort);
        }else {
            res.status(404).json({message: `Cohort Not Found`})
        }
    }
    catch(error){
        res.status(500).json(error);
    }
});

//POST
router.post('/', (req, res) => {
    const cohort = req.body;

    cohorts
      .add(cohort)
      .then(cohortIds => {
          res.status(201).json(cohortIds[0])
      })
      .catch(err => res.status(500).json(err))
});

//DELETE
router.delete('/:id', (req,res) => {
    const {id} = req.params;

    cohorts
      .remove(id)
      .then(cohortId => {
          if (!cohortId || cohortId<1) {
              res.status(404).json({message: `No Cohort Record Found to Delete`});
          }else {
              res.status(200).json(cohortId);
          }
      })
      .catch(err => res.status(500).json(err))
});

//PUT
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    cohorts
      .update(id, changes)
      .then(cohortId => {
          if (!cohortId || cohortId<1) {
              res.status(404).json({message: `No Cohort Record Found to Update`});
          }else {
              res.status(200).json(cohortId);
          }
      })
      .catch(err => res.status(500).json(err))
});


module.exports = router;
