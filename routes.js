const express = require('express');
const router = express.Router();

const db = require('knex')(require('./knexfile').development);

router.route('/cohorts').get(function(_, res, next) {
  db('cohorts')
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
});

module.exports = router;
