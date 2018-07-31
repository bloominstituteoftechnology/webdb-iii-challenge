const express = require('express')
const userRoutes = require('./userRoutes.js')
const postRoutes = require('./postRoutes')
const tagRoutes = require('./tagRoutes')


const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);

module.exports = router;