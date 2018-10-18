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
    const cohort = req.body;
    console.log(req.body);
    //Save data from body
    db.insert(cohort)
        .into('cohorts')
            .then(cohort => {
                res.status(201).json(cohort);
            })
                .catch(err => {
                    res.status(500).json(err);
            });

});

//Get Cohorts Endpoint
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

//Get Cohorts by Id
appServ.get('/api/cohorts/:id', (req, res) => {
    //Save data by id
    const {id} = req.params;
    console.log(id);
    db('cohorts')
        .where({id})
            .then(cohort => {
                res.status(200).json(cohort);
            })
                .catch(err => {
                    res.status(500).json(err);
            });

});












//Port & Port Listener
const port = 6000;
appServ.listen(port, () => console.log(`\n Listening on ${port}`));