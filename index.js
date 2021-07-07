const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);
const server = express();
server.use(helmet());
server.use(express.json());

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (!cohort.name) {
        res.status(400).json({ error: "The cohort needs a name" })
    } else
    db('cohort').insert(cohort)
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "There was an error saving the cohort." }))
})

server.get('/api/cohorts', (req, res) => {
    db('cohort')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json(err));
})
 server.get('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohort').where({ id: id })
    .then(cohort => {
        if (cohort.length === 0) {
        res.status(404).json({ message: "This cohort doesn't exist" });
        } else
        res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json(err));
})

server.get('/api/cohorts/:id/students', (req, res) => {
    const {id} = req.params;
    db('students').where({ cohort_id: id })
    .then(id => {
        if (cohort.length === 0) {
        res.status(404).json({ message: "This cohort or student doesn't exist" });
        } else
        res.status(200).json(id);
    })
    .catch(err => res.status(500).json(err));
})

 server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohort').where({ id: id }).del()
    .then(count => {
        if (count) {
        res.status(204).end();
        } else {
        res.status(404).json({ message: "This cohort doesn't exist" });
        }
    })
    .catch(err => res.status(500).json(err));
})
 server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    const cohort = req.body;
    if (!cohort.name) {
        res.status(400).json({ error: "The cohort needs a name" })
    } else
        db('cohort').where({ id: id }).update(cohort)
        .then(count => {
        if (count) {
            res.status(200).json({ message: "The cohort was successfully updated." });
        } else {
            res.status(404).json({ message: "This cohort doesn't exist" });
        }
        })
        .catch(err => res.status(500).json(err));
})

server.post('/api/students', (req, res) => {
    const students = req.body;
    if (!students.name) {
        res.status(400).json({ error: "The students needs a name" })
    } else
    db('students').insert(students)
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "There was an error saving the students." }))
})

server.get('/api/students', (req, res) => {
    db('students')
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => res.status(500).json(err));
})
 server.get('/api/students/:id', (req, res) => {
    const {id} = req.params;
    db('students').where({ id: id })
    .then(students => {
        if (students.length === 0) {
        res.status(404).json({ message: "This students doesn't exist" });
        } else
        res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
})
 server.delete('/api/students/:id', (req, res) => {
    const {id} = req.params;
    db('students').where({ id: id }).del()
    .then(count => {
        if (count) {
        res.status(204).end();
        } else {
        res.status(404).json({ message: "This students doesn't exist" });
        }
    })
    .catch(err => res.status(500).json(err));
})
 server.put('/api/students/:id', (req, res) => {
    const {id} = req.params;
    const students = req.body;
    if (!students.name) {
        res.status(400).json({ error: "The students needs a name" })
    } else
        db('students').where({ id: id }).update(students)
        .then(count => {
        if (count) {
            res.status(200).json({ message: "The students was successfully updated." });
        } else {
            res.status(404).json({ message: "This students doesn't exist" });
        }
        })
        .catch(err => res.status(500).json(err));
})


 const port = 3557;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});