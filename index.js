const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

server.post('/api/cohorts',    (req, res)  =>  {
    const cohort = req.body;
    db('cohorts').insert(cohort)
        .then(ids   =>  {
            res.status(201).json(ids)
        })
        .catch(err  =>  {
            res.status(500).json({ error: "Could not insert cohort" });
        })
})

server.get('/api/cohorts', (req, res)  =>  {
    db('cohorts')
        .then(rows   =>  {
            res.json(rows);
        })
        .catch(err  =>  {
            res.status(500).json({ error: "Could not get cohorts" });
        })
})

server.get('/api/cohorts/:id', (req, res)  =>  {
    const   { id }  =   req.params;
    db('cohorts').where('id', id)
        .then(rows   =>  {
            res.json(rows);
        })
        .catch(err  =>  {
            res.status(500).json({ error: "Could not get cohorts" });
        })
})

server.get('/api/cohorts/:id/students', (req, res)  =>  {
    const   { id }  =   req.params;
    db('students').where('id', id)
        .then(rows   =>  {
            if(rows.length === 0)   {
                res.status(404).json({ error: "No students in cohort or cohort does not exist" });
            }
            res.json(rows);
        })
        .catch(err  =>  {
            res.status(500).json({ error: "Could not get cohorts" });
        })
})

server.put('/api/cohorts/:id',  (req, res)  =>  {
    const   { id }  =   req.params;
    const name = req.body
    db('cohorts').where('id', id)
        .update(name)
        .then(rowCount  =>  {
            if(rowCount   === 0)    {
                res.status(400).json({ message: "Could not find the cohort with the specified id" });
            }
            res.json(rowCount);
        })
        .catch(err  =>  {
            res.status(500).json({ error: "Could not update the cohort" });

        })
})

server.delete('/api/cohorts/:id',  (req, res)  =>  {
    const { id }    =   req.params;
    db('cohorts').where('id',  id)
        .del()
        .then(rowCount  =>  {
            if(rowCount === 0)  {
                res.status(400).json({ message: "Could not find a cohort with the specified id"} );
            }
            res.json(rowCount);
        })
        .catch(err  =>  {
            res.status(500).json({ message: "Could not delete cohort" });
        })
})
