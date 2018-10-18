const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const knex = require('knex');

//Server Instantiation
const appServ = express();

//Import(require) knexfile & Instantiate a database object using knex
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

//Third party middleware
//express.json returns json objects of the response
//All global middlewares that will be used across enpoints must also be plugged into the app
//cors and helmet middlewares are not used
appServ.use(express.json(), logger('combined'), cors(), helmet());

//Root Request/Route Handler
appServ.get('/', (req, res) => {
    res.send('Test for root endpoint!')
});

//Create Cohorts Endpoint
appServ.post('/api/cohorts', (req, res) => {
    //Grab data from body
    const course = req.body;
    console.log(req.body);
    //Save data from body
    db.insert(course)
        .into('cohorts')
            .then(ids => {
                res.status(201).json(ids);
            })
                .catch(err => {
                    res.status(500).json(err);
            });

});

//Get courses
appServ.get('/api/cohorts', (req, res) => {
    //Get data
    db('cohorts')
            .then(cohorts => {
                res.status(200).json(cohorts);
            })
                .catch(err => {
                    res.status(500).json(err);
            });

});












//Port & Port Listener
const port = 6000;
appServ.listen(port, () => console.log(`\n Listening on ${port}`));