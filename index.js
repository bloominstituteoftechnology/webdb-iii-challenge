const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//GET
server.get('/', (req, res) => {
  res.send("It's Alive");
});

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
	.then(zoos => {
	    res.status(200).json(zoos);
	})
	.catch(err  => res.status(500).json(err));
});

server.get('/api/cohorts/:id', async (req, res) => {
    const {id} = req.params;
    const cohort = await db('cohorts')
	  .where({id})
	  .first();
    if(cohort) {
	res.status(200).json(cohort);
    } else {
	res.status(404).json({message: 'cohort not found'});
    }
});

server.get('/api/cohorts/:id/students', async (req, res) => {
    const {id} = req.params;
    const student = await db('students')
	  .where({id})
	  .first();
    if(student) {
	res.status(200).json(student);
    } else {
	res.status(404).json({message: 'student not found'});
    }
});

//POST
server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  db.insert(cohort)
    .into('cohorts')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//DELETE
server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts')
	.where({id})
	.del()
	.then(count => {
	    if (!count || count < 1) {
		res.status(404).json({message: 'No records found to remove'});
	    } else {
		res.status(200).json(count);
	    }
	})
	.catch(err => res.status(500).json(err));
});


//PUT
server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    db('cohorts')
	.where({id})
	.update(changes)
	.then(count => {
	    res.status(200).json(count);
	})
	.catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

