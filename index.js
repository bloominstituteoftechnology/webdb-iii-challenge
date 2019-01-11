const express = require('express');
const knex = require('knex');
const server = express();
server.use(express.json());

//PORT
const PORT = 5000;
//Knex 
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);


server.get('/api/cohorts', (req,res) => {
      db('cohorts').then( cohortInfo => {
           res.send(cohortInfo);
      })
});

server.get('/api/cohorts/:id', (req,res)=> {
     const id = req.params.id;
     db('cohorts').where('id',id)
                  .then( cohort => {
                      res.json(cohort);
                  })
})


server.listen(PORT, ()=> {
    console.log(`Listening at localhost ${PORT}`);
})