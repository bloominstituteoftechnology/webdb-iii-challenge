/*
Have the student returned by the [GET] /students/:id endpoint include the cohort name and remove the cohort_id fields. The returned object should look like this:

{
  id: 1,
  name: 'Lambda Student',
  cohort: 'Full Stack Web Infinity'
}

*/


//== Cohorts Router ============================================================

//-- Dependencies --------------------------------
const apiMaker   = require('./api-maker'  );
const crudHelper = require('./crud-helper');
const knexDB     = require('./database.js');
const config     = require('./config.js'  );

//-- Create Router -------------------------------
const API = module.exports = apiMaker(
    crudHelper(knexDB, config.TABLE_STUDENTS),
    {skipGetById: true},
);


//== Route Handlers ============================================================

API.get('/:id', async function (request, response, next){
    // Using 'config' made some things cleaner and less error prone,
    // ... not this.
    const C = config;
    const studentId = request.params.id;
    // Attempt to find item-data in database
    try{
        let studentData = await knexDB(config.TABLE_STUDENTS)
        .select(
            `${C.TABLE_STUDENTS}.${C.FIELD_ID} as ${C.FIELD_ID}`,
            `${C.TABLE_STUDENTS}.${C.FIELD_NAME} as ${C.FIELD_NAME}`,
            `${C.TABLE_COHORTS}.${C.FIELD_NAME} as ${C.FIELD_COHORT}`,
        )
        .join(
            C.TABLE_COHORTS,
            `${C.TABLE_STUDENTS}.${C.FIELD_COHORT_ID}`,
            '=',
            `${C.TABLE_COHORTS}.${C.FIELD_ID}`,
        )
        .where({
            [`${C.TABLE_STUDENTS}.${C.FIELD_ID}`]: studentId
        });
        // Inform the user if the requested data was not found
        if(!studentData){
            response.status(404);
            response.json({
                message: "The item with the specified ID does not exist.",
            });
        }
        // Send the requested data
        else{
            response.status(200);
            response.json(studentData);
        }
    }
    // Inform user of failure (database error)
    catch(error){
        console.log(error)
        response.status(500);
        response.json({
            error: "The item information could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally{
        next();
    }
});

