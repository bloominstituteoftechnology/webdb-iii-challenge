const express = require('express');
const studentsTable = require('../../data/helpers/studentsmodel');
const errorHandler = require('../ErrorHandler/errorhandler');
const router = express.Router();

// Routes


router.use(errorHandler);

module.exports = router;
