const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js')

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//---------GET REQUESTS-------//

//-----obligatory welcome----///
server.get('/', (req, res) => {
  db('cohorts')
  .then( cohorts => {
    res.status(200).send("welcome pilgrim");
  })
})

//All:

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
  .then( cohorts => {
    res.status(200).json(cohorts);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json(err)
  })
})
//BY ID:

server.get('/api/cohorts/:id', (req, res) => {
  const  {id} = req.params;
  db('cohorts')
  .select()
  .where('id', id)
  .then( cohorts => {
    res.status(200).json(cohorts);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json(err)
  })
})

//----POST ------//

server.post( '/api/cohorts', (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
  .into('cohorts')
  .then(cohorts => {
    res.status(201).json(cohorts);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

//-------DELETE------------//

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
   db('cohorts')
   .where({ id })
   .del()
   .then( cohorts => {
     res.status(200).json(cohorts);
   })
   .catch(err => {
     console.log(err)
     res.status(500).json(err)
   })
})

//-------------PUT-----------//
server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body;

  db('cohorts')
  .where( { id })
  .update(name)
  .then( cohorts => {
    res.status(200).json(cohorts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  })
});



const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
