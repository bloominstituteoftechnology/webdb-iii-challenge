const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile'); 
const server = express();
const db = knex(knexConfig.development);

server.get('/', async (req, res) => {
    const all = await db.table('cohorts');
    try{
        res.status(200).json(all);
    }
    catch(err){
        res.status(500).json({message: 'Error occurred while retrieving data.'})
    }
    


})