const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

const PORT = 3300;

// Cohorts
server.get('/api/cohorts', (req, res)=>{
    db('cohorts')
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({error: 'Failed to retrieve data'});
    })
})

server.get('/api/cohorts/:id', (req, res)=>{
    const {id} = req.params;
    db('cohorts')
    .where('id', id)
    .then(data=>{
        if(data.length){
            res.json(data);
        }
        else{
            res.status(404).json({errorMessage: 'Cohort not found'});
        }
    })
    .catch(err=>{
        res.status(500).json({error: 'Failed to retrieve data'});
    })
})

server.get('/api/cohorts/:id/students', (req, res)=>{
    const {id} = req.params;
    db('students')
    .where('cohort_id', id)
    .then(data=>{
        if(data.length){
            res.json(data);
        }
        else{
            res.status(404).json({errorMessage: `No students found in cohort ${id}`});
        }
    })
    .catch(err=>{
        res.status(500).json({error: 'Failed to retrieve data'});
    })
})

server.post('/api/cohorts', (req, res)=>{
    const cohort = req.body;
    if(cohort.name){
        db('cohorts')
        .insert(cohort)
        .then(id=>{
            res.status(201).json({id: id[0]});
        })
        .catch(err=>{
            res.status(500).json({error: 'Failed to add cohort to database'});
        })
    }
    else{
        res.status(400).json({errorMessage: 'Please include the name of the cohort'});
    }
})

server.delete('/api/cohorts/:id', (req, res)=>{
    const {id} = req.params;
    db('cohorts')
    .where('id', id)
    .del()
    .then(count=>{
        if(count){
            res.json({message: 'Deletion successful'})
        }
        else{
            res.status(404).json({errorMessage: 'Cohort not found'});
        }
    })
    .catch(err=>{
        res.status(500).json({error: 'Failed to delete the cohort'});
    })
})

server.put('/api/cohorts/:id', (req, res)=>{
    const {id} = req.params;
    const body = req.body;
    db('cohorts')
    .where('id', id)
    .update(body)
    .then(count=>{
        if(count){
            res.json({id: id, name: body.name});
        }
        else{
            res.status(404).json({errorMessage: 'Cohort not found'});
        }
    })
    .catch(err=>{
        res.status(500).json({error: 'Failed to update cohort'});
    })
})

// Students
server.get('/students', (req, res)=>{
    db('students')
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(500).json({error: 'Failed to retrieve data'});
    })
})

server.get('/students/:id', (req, res)=>{
    const {id} = req.params;
    db('students')
    .where('id', id)
    .then(studentData=>{
        if(studentData.length){
            db('cohorts')
            .where('id', studentData[0].cohort_id)
            .then(cohortData=>{
                res.json({
                    id: studentData[0].id,
                    name: studentData[0].name,
                    cohort: cohortData[0].name
                })
            })
        }
        else{
            res.status(404).json({errorMessage: 'Student not found'})
        }
    })
    .catch(err=>{
        res.status(500).json({error: 'Failed to retrieve data'});
    })
})

server.post('/students', (req, res)=>{
    const student = req.body;
    if(student.name && student.cohort_id){
        db('students')
        .insert(student)
        .then(id=>{
            res.status(201).json({id: id[0]})
        })
        .catch(err=>{
            res.status(500).json({error: 'Failed to add student to database'});
        })
    }
    else{
        res.status(400).json({errorMessage: 'Please include the name of the student and a valid cohort id'})
    }
})

server.delete('/students/:id', (req, res)=>{
    const {id} = req.params;
    db('students')
    .where('id', id)
    .del()
    .then(count=>{
        if(count){
            res.json({message: 'Deletion successful'});
        }
        else{
            res.status(404).json({errorMessage: 'Student not found'})
        }
    })
    .catch(err=>{
        res.status(500).json({error: 'Failed to delete data'});
    })
})

server.put('/students/:id', (req, res)=>{
    const {id} = req.params;
    const body = req.body;
    db('students')
    .where('id', id)
    .update(body)
    .then(count=>{
        if(count){
            db('students')
            .where('id', id)
            .then(studentData=>{
                if(studentData.length){
                    db('cohorts')
                    .where('id', studentData[0].cohort_id)
                    .then(cohortData=>{
                        res.json({
                            id: studentData[0].id,
                            name: studentData[0].name,
                            cohort: cohortData[0].name
                        })
                    })
                }
                else{
                    res.status(404).json({errorMessage: 'Student not found'})
                }
            })
        }
        else{
            res.status(404).json({errorMessage: 'Student not found'})
        }
    })
    .catch(err=>{
        res.status(500).json({error: 'Failed to update student'})
    })
})

server.listen(PORT, function(){
    console.log(`Server Listening on http://localhost:${PORT}`)
})