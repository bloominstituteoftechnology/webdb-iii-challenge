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
      db('cohorts')
      .then( cohortInfo => {
           res.json(cohortInfo);
      })
      .catch(err=> {
          res.status(500).json({err: "Failed to get cohorts"})
      });
});

server.get('/api/cohorts/:id', (req,res)=> {
     const id = req.params.id;
     db('cohorts')
     .where('id',id)
     .then( cohort => {
         res.json(cohort);
      })
      .catch(err=> {
        res.status(500).json({err: `Failed to get cohort with ${id}`})
    });
});

server.post('/api/cohorts/', (req,res) => {
      const cohort = req.body;
      console.log(cohort);
      db('cohorts')
      .insert(cohort)
      .then( cohortID => {
         res.status(201).json(cohortID);
      })
      .catch(err=> {
        res.status(500).json({err: "Failed to post cohort"})
    });

});

server.put('/api/cohorts/:id', (req,res) => {
     const {id} = req.params;
     const cohort = req.body;
     db('cohorts').where('id', id)
     .update(cohort)
     .then( newCohortRowCount => {
         res.json(newCohortRowCount)
     }) .catch(err=> {
      res.status(500).json({err: `Failed to update the cohort with the ${id}`})
  });
});

server.delete('/api/cohorts/:id', (req,res) => {
     const {id} = req.params;
     db('cohorts').where('id', id).del()
     .then( count => {
         res.status(201).json({Message: `Deleted cohort with the ID ${id} successfully`});
     }) .catch(err=> {
      res.status(500).json({err: `Failed to delete the cohort with the ID ${id}`})
  });
})


server.listen(PORT, ()=> {
    console.log(`Listening at localhost ${PORT}`);
})