

//== Database API Server =======================================================

//-- Dependencies --------------------------------
const express     = require('express'          );
const apiCohorts  = require('./api-cohorts.js' );
const apiStudents = require('./api-students.js');
const config      = require('./config.js'      );

//-- Create Server and open Port -----------------
const server = express();
server.listen(config.PORT, function() {
  console.log(config.MESSAGE_SERVER_START);
});

//-- Configure Server ----------------------------
server.use(express.json());
server.use(config.PATH_COHORTS , apiCohorts );
server.use(config.PATH_STUDENTS, apiStudents);
