const express = require('express');
const router = express.Router();

const { request, check, create, requestId } = require('./usersController');

router.route('/').get(request).post(check, create);

router.route('/:id').get(requestId)

module.exports = router;
