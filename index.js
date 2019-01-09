const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile.js');

const db =knex(dbConfig.development);
const PORT = 42;
const server = express();

server.use(express.json());

//MVP endpoints
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res
                .status(200)
                .json(cohorts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'The list of cohorts could not be retreived' });
        })
})

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where({ id: id })
        .then(name => {
            res
                .status(200)
                .json(name);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'The specified cohort could not be retreived' });
        })
})

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;
    db('students')
        .where( 'cohort_id', id )
        .then(students => {
            if (students.length > 0) {
                res
                    .status(200)
                    .json(students);
            } else {
                res
                    .status(404)
                    .json({ message: 'The specified students do not exist' })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'The specified students could not be retreived' });
        })
})

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (cohort.name) {
        db('cohorts')
            .insert(cohort)
            .then(id => {
                res
                    .status(201)
                    .json(id);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'The cohort could not be added.'});
            });
    }
    else {
        res
            .status(400)
            .json({message: 'Please include name.'});
    }
})

server.put('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    const cohort = req.body;
    if (cohort.name) {
        db('cohorts')
            .where('id', id)
            .update(cohort)
            .then(updatedCohort => {
                if (updatedCohort) {
                    res
                        .status(201)
                        .json({message: 'The cohort has been updated.'});
                }
                else {
                    res
                        .status(404)
                        .json({message: 'The specified cohort does not exist.'})
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'The update could not be completed.'})
            });
    }
    else {
        res
            .status(400)
            .json({message: 'Please include the updated name.'})
    }
})

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
        .where('id', id)
        .del()
        .then(cohort => {
            if (cohort) {
                res
                    .json({message: 'The cohort has been deleted.'});
            }
            else {
                res
                    .status(404)
                    .json({message: 'The specified cohort does not exist.'})
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'The specified cohort could not be deleted.'})
        });
})

//STRETCH ENDPOINTS
server.get('/api/students', (req, res) => {

})




server.listen(PORT, () => {
    console.log(`server live on port ${PORT}`);
})