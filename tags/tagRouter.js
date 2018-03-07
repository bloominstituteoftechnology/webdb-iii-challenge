const express = require('express');
const knex = require('../database/dbConfig');
const post_db = require('./tagController.js');

const tagRouter = express.Router()

// Tag routes