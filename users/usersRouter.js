const express = require('express');
const router = express.Router();

const usersController = require('./usersController');

const users = router.route('/').post(usersController.create);

module.exports = router;
