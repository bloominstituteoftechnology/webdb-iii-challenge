const express = require('express');
const cohortsTable = require('../../data/helpers/cohortsmodel');
const errorHandler = require('../ErrorHandler/errorhandler');
const router = express.Router();

// Routes


router.use(errorHandler);

module.exports = router;
