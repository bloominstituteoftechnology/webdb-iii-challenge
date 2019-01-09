const express = require('express');
const router = express.Router();
const knex = require('knex');

//const server = express();
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

/* ---------- GET /api/students---------- */

/* ---------- GET /api/students/:id ---------- */

/* ---------- POST /api/students ---------- */

/* ---------- PUT /api/students/:id ---------- */

/* ---------- DELETE /api/students/:id ---------- */

module.exports = router;