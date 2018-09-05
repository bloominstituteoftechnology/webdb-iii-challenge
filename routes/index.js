const express = require('express');

const courseRoutes = require('./courseRoutes.js');
const studentRoutes = require('./studentRoutes.js');

const router = express.Router();

router.use('/zoos', courseRoutes);
router.use('/bears', studentRoutes);

module.exports = router;