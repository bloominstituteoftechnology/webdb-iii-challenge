const express = require('express');

//Routes
const user = require('./users');
const post = require('./posts');
const tag = require('./tags');

const router = express.Router();

router.use('/users', user);
router.use('/posts', post);
router.use('/tags', tag);

module.exports = router;