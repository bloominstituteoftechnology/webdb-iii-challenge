const express = require('express');
const helmet = require('helmet');

const server = express();//server startup
server.use(helmet(), express.json()); //midware

let noDelete = 'Failed to delete';
let noFind = 'Cannot find';
let noUpdate = 'Cannot update';


// GET root serv
server.get('/', (request, response) => {
    response.send("Dance magic, dance.")
})

//POST cohort ep
server.post('/api/cohorts', (request, response) => {

  const { name } = request.body;

  db.insert({ name })
  .into('cohorts')
  .then( ids => {
    response.status(201).json(ids)
  })
  .catch(error => response.json(error))
})

// DELETE cohort ep
server.delete('/api/cohorts/:id', (request, response) => {
    const { id } = request.params;
    db('cohorts')
    .where({ id })
    .del()
    .then(deleted => {
      if (!deleted || deleted < 1) {
        return response.status(400).send({errorMessage: `${noDelete} cohort`})
      }
      response.status(200).json(deleted)
  })
    .catch(error => response.status(500).send(error))
  });

//GET cohort ep
  server.get('/api/cohorts/:id', (request, response) => {
    const { id } = request.params;
    db('cohorts')
    .where({ id })
    .then( cohort => {
        if (cohort.length < 1) {
            return response.status(404).json({errorMessage: `${noFind} cohort` })
        }
        response.status(200).send(cohort);
    })
    .catch(error => {response.status(500).json(error)})
});

//PUT cohort ep
server.put('/api/cohorts/:id', (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
    db('cohorts')
    .where({ id })
    .update({ name })
    .then(updated => {
    if (!updated || updated < 1) {
        return response.status(400).send({errorMessage:`${noUpdate} cohort`})
    }
    response.status(200).json(updated)
  })
    .catch(error => response.status(500).send(error))
  })





const port = 8000;
server.listen(port, () => {console.log(`#### Server active on port ${port} ####\n`)})
