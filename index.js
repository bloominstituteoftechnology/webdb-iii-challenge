const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const cohortDb = knex(knexConfig.development);
const server = express();
server.use(helmet());
server.use(express.json());

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));

// checker endpoint
server.get('/', (request, response) => {
    response.send('Server initialized.');
});

// endpoints here
server.get('/api/cohorts', (request, response) => {
    cohortDb('cohorts')
        .then(cohorts => {
            return response
                .status(200)
                .json(cohorts);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "Could not find list of cohorts." })
        });
});

server.get('/api/cohorts/:id', (request, response) => {
    const id = request.params.id;

    if (!{ id }) {
        return response
            .status(404)
            .json({ Error: "Could not find zoo." })
    }

    cohortDb('cohorts')
        .where({ id })
        .then(cohort => {
            return response
                .status(200)
                .json(cohort);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "Cohort info could not be retrieved." })
        });
});

server.post('/api/cohorts', (request, response) => {
    const name = request.body.name;
    const newCohort = { name };

    if (!newCohort.name) {
        return response
            .status(400)
            .send({ Error: "Missing name for the cohort" });
    }

    cohortDb
        .insert(newCohort)
        .into('cohorts')
        .then(ids => {
            return response
                .status(201)
                .json(ids[0]);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "There was an error while saving the cohort" })
        });
});

server.put('/api/cohorts/:id', (request, response) => {
    const id = request.params.id;
    const name = request.body.name;
    const updatedCohort = { name };

    if (!cohortDb('cohorts').where('id', '=', id)) {
        return response
            .status(404)
            .send({ Error: `Cohort with the following ID does not exist: ${id}` });
    } else if (!updatedCohort.name) {
        return response
            .status(400)
            .send({ Error: "Please enter name for the cohort" });
    }

    cohortDb('cohorts')
        .where('id', '=', id)
        .update(updatedCohort)
        .then(cohort => {
            return response
                .status(200)
                .json(cohort);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "The cohort info could not be modified" })
        });
});

server.delete('/api/cohorts/:id', (request, response) => {
    const id = request.params.id;

    if (!{ id }) {
        return response
            .status(404)
            .json({ Error: `There is no cohort with the following ID: ${id}` })
    }

    cohortDb('cohorts')
        .where({ id })
        .del()
        .then(removedCohort => {
            return response
                .status(200)
                .json(removedCohort);
        })
        .catch(() => {
            return response
                .status(500)
                .json({ Error: "The cohort could not be removed" })
        });
});