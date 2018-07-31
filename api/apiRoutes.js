const express = require('express');
const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;