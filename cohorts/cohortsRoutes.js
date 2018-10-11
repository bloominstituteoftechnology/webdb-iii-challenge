const express = require('express');

const cohorts = require('./cohortsModel.js');

const router = express.Router();



router.get('/api/cohorts', (req, res) => {
    cohorts
        .find().table('cohorts') 
        // .select('name').from('cohorts')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
  
    cohorts
      .add(cohort)
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

module.exports = router;