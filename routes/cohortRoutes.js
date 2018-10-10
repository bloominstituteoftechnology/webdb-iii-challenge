const express = require('express');

const db = require('../data/helpers/cohortModel.js')

const router = express.Router();

//GET
router.get('/', (req, res) => {
    db
      .find()
      .then(allCohorts => {
          res.status(200).json(allCohorts);
      })
      .catch(err => res.status(500).json(err));
});