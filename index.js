const express= require('express');
const knex=require('knex');

const dbConfig=require('./knexfile');

const server = express();
const db = knex(dbConfig.develepment);
const PORT=5434;

server.use(express.json());