const express = require('express');

const cohortRoutes = require('./cohortRoutes.js');
const studentRoutes = require('./studentRoutes.js');

const router = express.Router();

router.use('/cohorts', cohortRoutes);
router.use('/students', studentRoutes);

module.exports = router;