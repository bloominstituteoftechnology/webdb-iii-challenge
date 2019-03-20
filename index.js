
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js')

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// list all roles /GET
server.get('/api/cohorts', async (req, res) => {
  // get the roles from the database
  try {
    const cohorts = await db('cohorts'); // all the records from the table
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET BY ID

server.get('/api/cohorts/:id', async (req, res) => {
  // get the roles from the database
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST
server.post('/api/cohorts', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);

    const role = await db('cohorts')
      .where({ id })
      .first();

    res.status(201).json(role);
	}catch(err) {
			res.status(500).json(err);
		};
});


const port = process.env.PORT || 9090;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));