/// ----- Node Dependencies -----
const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');

/// ----- Initialize Server -----
const server = express();

/// ----- Initialize Database -----
const db = knex(knexConfig.development);

/// ----- Connect Middleware to Server -----
server.use(helmet(), express.json());


///// ---------- CRUD ENDPOINTS ----------


//// ----- Cohort Table Endpoints -----

/// ----- Root Server READ Endpoint -----
server.get('/', (request, response) => {
    response.send("Dance magic, dance.")
});


/// ----- CREATE Cohort Endpoint ----- 
server.post('/api/cohorts', (request, response) => {
    
    // Deconstruct Request Body
    const { name } = request.body;

    // Database Promise Functions
    db.insert({ name })
    .into('cohorts')
    .then( ids => {
        response.status(201).json(ids)
    })
    .catch(error => response.status(500).json(error))
});

/// ----- READ All Cohorts Endpoint ----- 
server.get('/api/cohorts', (request, response) => {

    // Database Promise Functions
    db('cohorts')
    .then(cohorts => {
        if (cohorts.length < 1) {
            return response.status(404).json({errorMessage: "No cohorts were found."})
        }
        response.status(200).json(cohorts)
    })
    .catch(error => response.status(500).json(error))
});

/// ----- READ Inidivudal Cohort Endpoint -----
server.get('/api/cohorts/:id', (request, response) => {

    // Extract Request URL Parameters
    const { id } = request.params;

    // Database Promise Functions
    db('cohorts')
    .where({ id })
    .then( cohort => {
        if (cohort.length < 1) {
            return response.status(404).json({errorMessage: "The cohort with the provided id could not be found."})
        }
        response.status(200).send(cohort);
    })
    .catch(error => {response.status(500).json(error)})
});

/// ----- READ All Students of Individual Cohort Endpoint -----
server.get('/api/cohorts/:cohort_id/students', (request, response) => {

    // Extract Request URL Parameters
    const { cohort_id } = request.params;

    // Database Promise Functions
    db('students')
    .where({ cohort_id })
    .then( students => {
        if (students.length < 1) {
            return response.status(404).json({message: "No students were found for that cohort."})
        }
        response.status(200).send(students);
    })
    .catch(error => {response.status(500).json(error)})
});

/// ----- UPDATE Cohort Endpoint -----
server.put('/api/cohorts/:id', (request, response) => {

    // Extract Request URL Parameters
    const { id } = request.params;
  
    // Deconstruct Request Body
    const { name } = request.body;
  
    // Database Promise Functions
    db('cohorts')
    .where({ id })
    .update({ name })
    .then(updated => {
    if (!updated || updated < 1) {
        return response.status(400).send({errorMessage:`Unable to update the information of the cohort with the provided id.`})
    }
    response.status(200).json(updated)
  })
    .catch(error => response.status(500).send(error))
  });
  
/// ----- DELETE Cohort Endpoint -----
server.delete('/api/cohorts/:id', (request, response) => {

    // Extract Request URL Parameters
    const { id } = request.params;
    
    // Database Promise Functions
    db('cohorts')
    .where({ id })
    .del()
    .then(deleted => {
        if (!deleted || deleted < 1) {
        return response.status(400).send({errorMessage:`Unable to delete the cohort with the provided id.`})
        }
        response.status(200).json(deleted)
    })
    .catch(error => response.status(500).send(error))
    });


//// ----- Student Table Endpoints -----

/// ----- CREATE Student Endpoint ----- 
server.post('/api/students', (request, response) => {
    
    // Deconstruct Request Body
    const { name, cohort_id } = request.body;

    // Database Promise Functions
    db.insert({ name, cohort_id })
    .into('students')
    .then( ids => {
        response.status(201).json(ids)
    })
    .catch(error => response.status(500).json(error))
});


/// ----- READ All Students Endpoint ----- 
server.get('/api/students', (request, response) => {

    // Database Promise Functions
    db('students')
    .then(students => {
        if (students.length < 1) {
            return response.status(404).json({errorMessage: "No students were found."})
        }
        response.status(200).json(students)
    })
    .catch(error => response.status(500).json(error))
});

/// ----- READ Inidivudal Student Endpoint -----
server.get('/api/students/:id', (request, response) => {

    // Extract Request URL Parameters
    const { id } = request.params;

    // Database Promise Functions
    db('students')
    .where({ id })
    .then( student => {
        if (student.length < 1) {
            return response.status(404).json({errorMessage: "The student with the provided id could not be found."})
        }
        db('cohorts')
        .where({ id })
        .then( cohort => {
            if (cohort.length < 1) {
                return response.status(404).json({errorMessage: "The cohort with the provided id could not be found."})
            }

            response.status(200).send({id: student[0].id, name: student[0].name, cohort: cohort[0].name});
    })
    .catch(error => {response.status(500).json(error)})
    })
    .catch(error => {response.status(500).json(error)})
});

/// ----- UPDATE Student Endpoint -----
server.put('/api/students/:id', (request, response) => {

    // Extract Request URL Parameters
    const { id } = request.params;
  
    // Deconstruct Request Body
    const { name } = request.body;
  
    // Database Promise Functions
    db('students')
    .where({ id })
    .update({ name })
    .then(updated => {
    if (!updated || updated < 1) {
        return response.status(400).send({errorMessage:`Unable to update the information of the student with the provided id.`})
    }
    response.status(200).json(updated)
  })
    .catch(error => response.status(500).send(error))
  })

  /// ----- DELETE Student Endpoint -----
server.delete('/api/students/:id', (request, response) => {

    // Extract Request URL Parameters
    const { id } = request.params;
    
    // Database Promise Functions
    db('students')
    .where({ id })
    .del()
    .then(deleted => {
        if (!deleted || deleted < 1) {
        return response.status(400).send({errorMessage:`Unable to delete the student with the provided id.`})
        }
        response.status(200).json(deleted)
    })
    .catch(error => response.status(500).send(error))
    });



const port = 9999;
server.listen(port, () => {console.log(`#### Server active on port ${port} ####\n`)});