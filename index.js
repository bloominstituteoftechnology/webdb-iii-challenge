

//== Database API Server =======================================================

//-- Dependencies --------------------------------
const express  = require('express'          );
const apiMaker = require('./api-maker'      );
const database = require('./database-access');

//-- Constants -----------------------------------
const PORT = 3300;
const MESSAGE_SERVER_START = `\nServer started on port ${PORT}\n`;
const TABLE_COHORTS  = 'cohorts';
const TABLE_STUDENTS = 'students';
const PATH_COHORTS  = '/api/cohorts' ;
const PATH_STUDENTS = '/api/students';

//-- Create Server and open Port -----------------
const server = express();
server.listen(PORT, function() {
  console.log(MESSAGE_SERVER_START);
});

//-- Configure Server ----------------------------
server.use(express.json());
server.use(PATH_COHORTS , apiMaker(database(TABLE_COHORTS )));
server.use(PATH_STUDENTS, apiMaker(database(TABLE_STUDENTS)));
