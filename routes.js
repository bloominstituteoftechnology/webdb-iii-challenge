const express = require('express');
const router = express.Router();

const db = require('knex')(require('./knexfile').development);

function sendError(res, status, message) {
  return res.status(status).json({ message });
}

router
  .route('/cohorts')
  .get(function(_, res, next) {
    db('cohorts')
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  })
  .post(function(req, res, next) {
    if (!req.body.name)
      return sendError(res, 400, 'You need to provide a name');

    db('cohorts')
      .insert({ name: req.body.name })
      .then(data => {
        res
          .status(201)
          .json({ message: 'Cohort created successfully', id: data });
      })
      .catch(next);
  });

module.exports = router;
