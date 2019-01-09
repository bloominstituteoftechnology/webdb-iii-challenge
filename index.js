const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile'); 
const server = express();
const db = knex(knexConfig.development);