const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('API Running...');
});

//====GET ALL COHORTS====
server.get('/api/cohorts', async (req, res) => {
	try {
		let cohorts = await db('cohorts')
		res.status(200).json(cohorts)
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'There was an error accessing the cohorts from the database.' })
	}
});

//====GET COHORT BY ID====
 server.get('/api/cohorts/:id', async (req, res) => {
	const { id } = req.params
	try {
		let cohort = await db('cohorts').where('id', id)
		cohort.length !== 0 ? res.status(200).json(cohort) : res.status(404).json({ message: 'ID NOT FOUND' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'There was an error accessing that cohort from the database.' })
	}
})


server.listen(9000, () => console.log('Server running on port 9000'));
