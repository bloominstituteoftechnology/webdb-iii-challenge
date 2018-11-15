

//== Cohorts Router ============================================================

//-- Dependencies --------------------------------
const apiMaker   = require('./api-maker'  );
const crudHelper = require('./crud-helper');
const knexDB     = require('./database.js');
const config     = require('./config.js'  );

//-- Create Router -------------------------------
const API = module.exports = apiMaker(crudHelper(knexDB, config.TABLE_COHORTS));


//== Route Handlers ============================================================

//-- Get all students belonging to a cohort, specified by id
API.get('/:id/students', async function(request, response, next){
    // Get cohort Id from url parameters
    const id = request.params.id;
    // Select matching students from database
    try {
        let studentArray = await knexDB(config.TABLE_STUDENTS).where({
            [config.COHORT_ID]: id
        });
        // Handle cases where cohort does not exist
        // Send data to requesting agent
        response.status(200);
        response.json(studentArray);
    }
    // Error Handling
    catch(error) {
        response.status(500);
        response.json({
            error: "The students array could not be retrieved.",
        });
    }
    // Pass to next middleware
    finally {
        next();
    }
});
