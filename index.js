const express = require('express');

const server = express();

server.use(express.json());
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

// endpoints here
server.post("/api/cohorts", (req, res)=>{
  const name= req.body;
  db('cohorts')
    .insert(name)
    .then(ids=>{
      res.status(201).json(ids);
    })
    .catch(error=>{
      res.status(500).json({message: "Error inserting", error});
    });
})
server.get('/api/cohorts', (req, res)=>{
  db('cohorts')
    .then(cohorts=>res.status(200).json(cohorts))
    .catch(error=>res.status(500).json(error));
});
server.put('/api/cohorts/:id', (req, res)=>{
  const changes= req.body;
  const id= req.params;
  db('cohorts')
    .where({id:id})
    .update(changes)
    .then(count=>{
      res.status(200).json({count});
    })
    .catch(error=>res.status(500).json(error));
});
server.delete('/api/cohorts/:id', (req,res)=>{
  const {id}=req.params
  db('cohorts')
    .where({id: id-1})
    .del()
    .then(count=>{
      res.status(200).json({count});
    })
    .catch(error=>res.status(500).json(error));
})
server.get('/api/cohorts/:id', (req,res)=>{
  const{id}= req.params
  db('cohorts').get(id-1)
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort)
      } else {
        res.status(404).json({message: 'cohort not found'})
      }
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
})
//students start here
server.post("/api/students", (req, res)=>{
    const name= req.body;
    db('students')
      .insert(name)
      .then(ids=>{
        res.status(201).json(ids);
      })
      .catch(error=>{
        res.status(500).json({message: "Error inserting", error});
      });
  })
  server.get('/api/students', (req, res)=>{
    db('students')
      .then(cohorts=>res.status(200).json(cohorts))
      .catch(error=>res.status(500).json(error));
  });
  server.put('/api/students/:id', (req, res)=>{
    const changes= req.body;
    const id= req.params;
    db('students')
      .where({id:id})
      .update(changes)
      .then(count=>{
        res.status(200).json({count});
      })
      .catch(error=>res.status(500).json(error));
  });
  server.delete('/api/students/:id', (req,res)=>{
    const {id}=req.params
    db('students')
      .where({id: id-1})
      .del()
      .then(count=>{
        res.status(200).json({count});
      })
      .catch(error=>res.status(500).json(error));
  })
  server.get('/api/students/:id', (req,res)=>{
    const{id}= req.params
    db('students').get(id-1)
      .then(cohort => {
        if (cohort) {
          res.status(200).json(cohort)
        } else {
          res.status(404).json({message: 'students not found'})
        }
      })
      .catch(err => {
        res.status(500).json({message: err})
      })
  })
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});