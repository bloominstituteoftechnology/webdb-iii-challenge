const express = require('express');

//routes
const cohortRoute = require('./cohorts');
const studentRoute = require('./students');

const router = express.Router();

router.use('/cohorts', cohortRoute);
router.use('/students', studentRoute);

module.exports = router;
