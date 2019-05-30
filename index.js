const express = require('express');
const helmet = require('helmet');
const server = express();
const knex = require('knex');
const knexConfig = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/lambda.db3'
		},
		useNullAsDefault: true
	}
};

const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
	res.json('Welcome to Lambda School!');
});

server.get('/cohorts', (req, res) => {
	db('cohorts')
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

server.post('/cohorts', async (req, res) => {
	await db('cohorts')
		.insert(req.body)
		.then((newCohort) => {
			res.json(newCohort);
		})
		.catch((err) => {
			res.json(err);
		});
});

server.get('/cohorts/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.then((cohort) => {
			res.json(cohort);
		})
		.catch((err) => {
			res.json(err);
		});
});

server.get('/cohorts/:id/students', (req, res) => {
	db('students')
		.where({ cohort_id: req.params.id })
		.then((students) => {
			res.json(students);
		})
		.catch((err) => {
			res.json(err);
		});
});

server.put('/cohorts/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.update(req.body)
		.then((count) => {
			if (count > 0) {
				res.json(`${count} records updated`);
			} else {
				res.json('ID not Found');
			}
		})
		.catch((err) => {
			res.json(err);
		});
});

server.delete('/cohorts/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.delete()
		.then((count) => {
			if (count > 0) {
				res.json(`${counts} records deleted`);
			} else {
				res.json('ID NOT FOUND');
			}
		})
		.catch((err) => {
			res.json(err);
		});
});

// Listening on Port 3300
const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
