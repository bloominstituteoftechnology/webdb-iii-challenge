const express = require('express');

const cohortsRoutes = require('./Cohorts/cohortsRoutes.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'api' });
})

router.use('/cohorts', cohortsRoutes)

module.exports = router;
