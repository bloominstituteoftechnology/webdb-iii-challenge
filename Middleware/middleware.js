const   express = require('express'),
        helmet = require('helmet'),
        morgan = require('morgan'),
        Router = require('../Routers/routers.js');
        

module.exports = (server) =>{
    server.use(
        express.json(),
        helmet(),
        morgan('dev')
    );
    server.use('/api/cohorts', Router.routerCohorts);
    server.use('/api/students', Router.routerStudents);
}
